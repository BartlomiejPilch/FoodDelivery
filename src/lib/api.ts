const API_BASE = import.meta.env.VITE_API_BASE as string;

async function getJson<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { Accept: "application/json" },
    credentials: "include",
  });
  if (!res.ok) throw await buildHttpError(res);
  return res.json() as Promise<T>;
}

async function postJson<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    credentials: "include",
  });
  if (!res.ok) throw await buildHttpError(res);
  return res.json() as Promise<T>;
}

async function buildHttpError(res: Response) {
  let msg = `HTTP ${res.status}`;
  try {
    const txt = await res.text();
    if (txt) {
      try {
        const j = JSON.parse(txt);
        msg = j.error || j.message || txt || msg;
      } catch {
        msg = txt;
      }
    }
  } catch { }
  return new Error(msg);
}

function qs(obj: Record<string, unknown> = {}) {
  const pairs = Object.entries(obj)
    .filter(([, v]) => v !== undefined && v !== "")
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`);
  return pairs.length ? `?${pairs.join("&")}` : "";
}

export type Dish = {
  id: number;
  name: string;
  title?: string;
  description?: string;
  png?: string;
  allergens?: string;
  note?: string;
  reviews?: string;
  reviews_quantity?: number;
  upload_date?: string;
};

export type MenuRow = {
  id: number;
  date_to_sell: string;
  price: number;
  is_active: boolean;
  dish_id: number;
};

export type MenuWithDishRow = MenuRow & { dish?: Dish | null };

export type DeliveryHour = { id: number; hour: string; note?: string; is_active: boolean };
export type DeliveryPlace = { id: number; place_name: string; note?: string; is_active: boolean };

export type RabatsRow = {
  id: number;
  name: string;
  description?: string;
  code: string;
  active_to: string;
  percentage: number;
};

export type SettingsRow = { id: number; order_to_hour: string; created_at?: string; updated_at?: string };

export type OrderCreateRequest = {
  menu_id: number;
  name: string;
  delivery_hour_id: number;
  delivery_place_id: number;
  price: number; 
  email: string;
  paid_type?: string | null;
  is_completed?: boolean;
  rabat_id?: number | null;
};

export type OrderCreateResponse = { id: number };

export type RabatValidation = {
  valid: boolean;
  id?: number;
  percentage?: number;
  active_to?: string;
  reason?: string;
};

export async function postFrontendOrder(body: {
  name: string;
  email: string;
  delivery_place_id: number;
  delivery_hour_id: number;
  items: { menu_id: number; quantity: number }[];
  rabat_code?: string;
}) {
  const res = await fetch(`${API_BASE}/frontend/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(body),
    credentials: 'include',
  });

  if (!res.ok) {
    const txt = await res.text();
    console.error('Order create failed:', res.status, txt);
    try {
      const j = JSON.parse(txt);
      throw new Error(j?.error || txt || `HTTP ${res.status}`);
    } catch {
      throw new Error(txt || `HTTP ${res.status}`);
    }
  }
  return res.json() as Promise<{ ok: boolean; created: any[] }>;
}

export const api = {
  // dishes
  dishes: (q?: string, limit = 50, offset = 0) =>
    getJson<{ items: Dish[] }>(`/dishes${qs({ q, limit, offset })}`),

  dish: (id: number) => getJson<Dish>(`/dishes/${id}`),

  // menu
  menu: (params: Partial<MenuRow> & { limit?: number; offset?: number } = {}) =>
    getJson<{ items: MenuRow[] }>(`/menu${qs(params)}`),

  // menu + join z daniem
  menuExpanded: (params: Partial<MenuRow> & { limit?: number; offset?: number } = {}) =>
    getJson<{ items: MenuWithDishRow[] }>(`/menu${qs({ ...params, expand: "dish" })}`),

  // delivery meta
  getDeliveryHours: () => getJson<{ items: DeliveryHour[] }>(`/public/delivery-hours`),
  getDeliveryPlaces: () => getJson<{ items: DeliveryPlace[] }>(`/public/delivery-places`),

  // settings
  getSettings: () => getJson<SettingsRow>(`/settings`),

  //rabat
  findRabatByCode: async (code: string) => {
    const up = code.trim().toUpperCase();
    try {
      const res = await getJson<{ items: RabatsRow[] }>(`/rabats${qs({ code: up, limit: 5 })}`);
      const found = (res.items || []).find(r => r.code?.toUpperCase() === up);
      return found || null;
    } catch (e) {
      const res = await getJson<{ items: RabatsRow[] }>(`/rabats${qs({ limit: 200 })}`);
      const found = (res.items || []).find(r => r.code?.toUpperCase() === up);
      return found || null;
    }
  },

  validateRabatCode: async (code: string) => {
    const up = code.trim().toUpperCase();
    if (!up) return null;
    try {
      const res = await getJson<RabatValidation>(`/public/rabats/validate?code=${encodeURIComponent(up)}`);
      return res.valid ? { id: res.id!, percentage: res.percentage!, active_to: res.active_to! } : null;
    } catch {
      // 404 to do- dodac zaslepke
      return null;
    }
  },

  // orders
  postOrder: (body: OrderCreateRequest) =>
    postJson<OrderCreateResponse>(`/orders`, body),
};
