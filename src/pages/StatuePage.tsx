import TopHeader from "../components/TopHeader";
import { useCart } from "../context/CartContext";
import { useState } from "react";


export default function StatuePage() {

    return (
        <section className="relative min-h-screen flex flex-col justify-between text-white py-10 px-4">
            {/* Tło */}
            <img
                src="/img/bg-colorova.png"
                alt="Tło desktop"
                className="hidden md:block absolute top-0 left-0 w-full h-auto object-cover z-0 pointer-events-none drop-shadow"
            />
            <img
                src="/img/bg-mobile.png"
                alt="Tło mobile"
                className="block md:hidden absolute top-0 left-0 w-full h-auto object-cover z-0 pointer-events-none"
            />

            {/* Logo / nagłówek */}
            <TopHeader />

            {/* Główna zawartość */}
            <div className="relative z-10 w-full flex flex-col items-center ">
                <div className="items-centeritems-center mb-6">
                    <h1 className="text-3xl md:text-5xl font-extrabold mb-4 text-[#ffffff] pt-2.5 text-center" style={{ textShadow: "0px 0px 10px rgba(0, 0, 0, 1)" }}>
                       <br/><br/> REGULAMIN ZAMÓWIEŃ POSIŁKÓW <br/>W RESTAURACJI COLOROVA<br/><br/>
                    </h1>
                </div>

                {/* Dwukolumnowy układ */}
                <div className="w-full max-w-6xl grid grid-cols-1 gap-8 ">
                    {/* Lewa kolumna – lista produktów */}
                    <div className="rounded-sm space-y-4 text-[#000000] backdrop-blur-sm p-10 "style={{ textShadow: "0px 0px 2px rgba(255, 255, 255, 1)" }}>
                        <p>Niniejszy regulamin (zwany w dalszej części Regulaminem) określa warunki korzystania z systemu zamówień posiłków przez stronę http://restauracjacolorova.com udostępnioną dla pracowników Grupy Colorex.
                            Przed złożeniem zamówienia w systemie należy uważnie przeczytać poniższy Regulamin i zapoznać się z jego treścią. Zaakceptowanie warunków Regulaminu jest równoważne z tym, że Użytkownik zapoznał się z
                            treścią Regulaminu i zgadza się ze wszystkimi jego postanowieniami oraz zobowiązuje się do korzystania z Systemu zgodnie z Regulaminem oraz z przepisami powszechnie obowiązującego prawa.
                        </p>
                        <p className="text-center"><strong>§ 1<br />Definicje</strong></p>
                        <p>
                            <ul>
                                <li>1.	Administrator – Restauracja Colorova – prowadzona przez spółkę Colorova Sp. z o.o. z siedzibą w Krakowie, ul. Łuczanowicka 44,
                                    wpisaną do rejestru przedsiębiorców prowadzonego przez Sąd Rejonowy dla Krakowa – Śródmieścia w Krakowie XI Wydział Gospodarczy Krajowego Rejestru Sądowego pod nr KRS 0000272288. </li>
                                <li>2.	Regulamin – niniejsze postanowienia określające zasady korzystania z Systemu.</li>
                                <li>3.	System – system zamówień posiłków za pośrednictwem strony http://restauracjacolorova.com</li>
                                <li>4.	Usługi – sprzedaż posiłków przez Restaurację Colorova</li>
                                <li>5.	Klient – pracownik Grupy Colorex składający zamówienie za pośrednictwem Systemu </li>
                                <li>6.	Zamówienie – zamówienie posiłku złożone przez Klienta za pośrednictwem Systemu</li>
                                <li>7.	Menu – posiłki oferowane przez Restaurację dla Klientów za pośrednictwem Systemu</li>
                                <li>8.	Cennik –</li>
                                <li>9.	Płatności – system płatności internetowych obsługiwany przez bramkę płatniczą banku Santander</li>

                            </ul>
                        </p>
                        <p className="text-center"><strong>§ 2<br />Wymagania techniczne</strong></p>
                        <p>
                            <ul>
                                <li>1.	Do użytkowania Systemu niezbędne jest posiadanie urządzenia z dostępem do Internetu , oraz przeglądarki internetowej
                                    – umożliwiającej wyświetlanie na ekranie urządzenia dokumentów hipertekstowych, powiązanych w sieci Internet przez sieciową usługę WWW oraz obsługującej język programowania
                                    JavaScript, a ponadto akceptującej pliki typu cookies.</li>
                                <li>2.	W celu złożenia zamówienia Klient musi posiadać indywidualne, aktywne konto e-mail.</li>
                                <li>3.	Koszty wynikające z posługiwania się przez Klienta środkami porozumiewania się na odległość (koszty połączenia z Internetem, SMS, połączeń telefonicznych)
                                    celem skorzystania z Usług Administratora, ponosi Klient zgodnie z cennikami dostawców, z których usług korzysta.</li>
                            </ul>
                        </p>
                        <p className="text-center"><strong>§ 3<br />Składanie Zamówień</strong></p>
                        <p>
                            <ul>
                                <li>1.	System został stworzony w celu umożliwienia Klientom składania Zamówień posiłków przygotowanych w Restauracji Colorova.</li>
                                <li>2.	Zamówienie można złożyć za pośrednictwem Systemu poprzez dedykowany formularz zamówienia.</li>
                                <li>3.	Formularz zamówienia wymaga podania przez Klienta następujących danych osobowych: imienia, nazwiska oraz adresu e-mail. Przetwarzanie danych osobowych opisuje § 7 Regulaminu.</li>
                                <li>4.	Klient zobowiązany jest do zapoznania się z treścią Regulaminu oraz zaakceptowania jego treści.</li>
                                <li>5.	Restauracja zastrzega sobie miejsca odbioru Zamówienia dostępne przy wyborze w zakładce „Miejsca odbioru” w formularzu Zamówienia. </li>
                            </ul>
                        </p>
                        <p className="text-center"><strong>§ 4<br />Odpłatność za Zamówienie</strong></p>
                        <p>
                            <ul>
                                <li>1.	Podmiotem świadczącym obsługę Płatności za Zamówienie jest Santander Bank Polska. </li>
                                <li>2.	Czas realizacji zamówienia jest liczony od momentu uzyskania pozytywnej autoryzacji płatności.</li>

                            </ul>
                        </p>

                        <p className="text-center"><strong>§ 5<br />Odpowiedzialność Administratora</strong></p>
                        <p>
                            <ul>
                                <li>1.	Administrator ponosi odpowiedzialność za niewykonanie lub nienależyte wykonanie zobowiązań względem Klienta, w sytuacji niedostarczenia Zamówienia,
                                    o ile jego działanie jest zawinione i umyślne.
                                    Odpowiedzialność Administratora ograniczona jest do wysokości poniesionych przez Klienta szkód i nie obejmuje utraconych korzyści.</li>
                                <li>2.	Administrator nie ponosi odpowiedzialności za brak pełnej funkcjonalności Usług, gdy nie działa strona internetowa
                                    Restauracji, w sytuacji gdy wynika to z niedostępności dostawców usług hostingu lub usług domenowych, z których korzysta Klient.</li>

                            </ul>
                        </p>
                        <p className="text-center"><strong>§ 6<br />Zobowiązania Klienta</strong></p>
                        <p>
                            Klient zobowiązany jest do:
                            <ul>
                                <li>a)	do korzystania z Systemu w sposób zgodny z jego przeznaczeniem i przepisami prawa oraz Regulaminem, </li>
                                <li>b)	do korzystania z Serwisu w sposób nieuciążliwy dla pozostałych Klientów oraz dla Usługodawcy,</li>
                                <li>c)	do korzystania z Serwisu w sposób niezakłócający jego funkcjonowania oraz nienarażający ich na cyberataki,
                                    w szczególności poprzez stosowanie programu antywirusowego z aktualną bazą wirusów, zapory sieciowej (firewall)
                                    oraz zabezpieczenia korzystania z Systemu przed nieautoryzowanym dostępem.</li>
                            </ul>
                        </p>
                        <p className="text-center"><strong>§ 7<br />Dane osobowe. Klauzula informacyjna</strong></p>
                        <p>

                            <ul>
                                <li>1.	Administratorem danych osobowych jest Colorova Sp. z o.o. (ul. Łuczanowicka 30, 31-766 Kraków).
                                    Z Administratorem można się skontaktować za pośrednictwem formularza zgłoszeniowego/telefonu dostępnego na stronie www.colorova.pl w zakładce kontakt.</li>
                                <li>2.	Dane osobowe w postaci imienia, nazwiska i adresu e-mail będą przetwarzane w celu realizacji zamówienia złożonego przez Klienta w Systemie.</li>
                                <li>3.	Klientowi  przysługuje prawo: dostępu do swoich danych oraz żądania ich sprostowania, usunięcia, ograniczenia przetwarzania danych, prawo do przeniesienia danych,
                                    wniesienia sprzeciwu wobec przetwarzania danych osobowych bez wpływu na zgodność z prawem przetwarzania, wniesienia skargi do organu nadzorczego.
                                    W celu skorzystania z powyższych praw, poza wniesieniem skargi do organu nadzorczego, należy skontaktować się z administratorem. Dane kontaktowe wskazane są wyżej.
                                    Część praw zostanie zrealizowana po poprawnym zweryfikowaniu osoby.</li>
                                <li>4.	Podanie danych osobowych jest dobrowolne, ale niezbędne w celu złożenia zamówienia przez Klienta i dostarczenia go przez Restaurację.</li>
                            </ul>
                        </p>
                        <p className="text-center"><strong>§ 8<br />Zmiana Regulaminu</strong></p>
                        <p>
                            <ul>
                                <li>1.	Administrator zastrzega sobie prawo do dokonywania zmian Regulaminu w każdym czasie, jeżeli zmiana jest wymagana przepisami obowiązującego prawa,
                                    a także w celu poprawy jakości lub rozszerzenia zakresu świadczonych Usług Administratora. </li>
                                <li>2.	Wszelkie zmiany Regulaminu zostaną podane do wiadomości Klienta poprzez zamieszczenie nowej treści Regulaminu w Systemie, która wchodzi w życie w momencie publikacji. </li>
                            </ul>
                        </p>

                        <p className="text-center"><strong>§ 9<br />Postanowienia końcowe</strong></p>
                        <p>
                            <ul>
                                <li>1.	Regulamin jest dostępny w Systemie w każdym czasie w sposób pozwalający na jego utrwalanie i kopiowanie przez Klientów.</li>
                                <li>2.	W sprawach nieuregulowanych Regulaminem zastosowanie znajdują powszechnie obowiązujące przepisy prawa polskiego.</li>
                                <li>3.	Wszelkie spory pomiędzy Administratorem i Klientem rozstrzygane będą przez sąd według właściwości ogólnej Administratora.</li>
                                <li>4.	Uznanie poszczególnych postanowień niniejszego Regulaminu w sposób przewidziany prawem za nieważne bądź nieskuteczne 
                                    nie wpływa na ważność czy skuteczność pozostałych postanowień Regulaminu. W miejsce nieważnego postanowienia zastosowana będzie reguła, która jest najbliższa celom nieważnego postanowienia i całego niniejszego Regulaminu.</li>
                            </ul>
                        </p>
                    </div>



                </div>

                {/* Powrót */}
                <button
                    onClick={() => window.history.back()}
                    className="mt-10 bg-[#be0102] text-white py-2 px-6 rounded-full shadow-lg text-sm font-semibold"
                >
                    Wróć do menu
                </button>
            </div>

            {/* Stopka */}
            <footer className="absolute bottom-0 left-0 w-full h-[180px] z-[-1] pointer-events-none">
                <img
                    src="/img/footer-1.png"
                    alt="Stopka"
                    className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 w-full text-center text-white text-sm md:text-base font-light pointer-events-none">
                    © {new Date().getFullYear()} Colorova. Wszelkie prawa zastrzeżone.
                </div>
            </footer>
        </section>
    );
}
