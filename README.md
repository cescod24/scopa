# Scopa
HTML/JS based famous italian card game: "Scopa"

#ITA
Per giocare, aprire la cartella "scopa(def)" e aprire il file "scopa.html".
Le istruzioni del gioco sono presenti sulla pagina. Ho lasciato alcuni commenti per capire meglio il codice JS.
Il bot l'ho programmato sulla base delle mie conoscenze del gioco della scopa, ragionando su cosa avvantaggia e svantaggia l'avversario o te stesso.
Ho creato 4 livelli del bot, con il quarto livello che ha la peculiarità di ragionare in base alla mano dell'avversario: il bot livello 4
conosce pertanto la mano dell'avversario! Tuttavia, non considerando il fattore fortuna, succede che anche il livello 1 batta il livello 4: 
è normale, dato che, in francese, se le carte non girano, non girano... nei giochi di carte anche un principiante può battere un esperto, qualche volta...
Per questioni di tempo ho omesso quindi quei calcoli che renderebbero il bot di livello 4 imbattibile e l'ho pertanto reso semplicemente "forte".

Ho aggiunto la variante asso di Cesco, che sarebbe l'asso di spade, per il mero divertimento di creare una variante. L'asso di Cesco vale come un settebello.


Se si vuole testare i bot, ho lasciato in dotazione un programma (che è praticamente identico a quello normale) che permette di far scontrare i bot.
Semplicemente, basta definire le variabili "botZeroLevel" e "botOneLevel" con il livello dei bot da far scontrare: botZero sarebbe "Tu" e botOne 
"Avversario". Per giocare, si deve scegliere il livello tramite le variabili sopraccitate e far partire il gioco e quando si inizia il gioco i bot giocheranno fino
a conclusione della partita.

Per ulteriori informazioni e/o soprattutto in presenza di bugs, non esitate a contattarmi:
Francesco Dozio, 
fdozio@outlook.com

Buon divertimento!!!

#ENG
In order to play, open "scopa(def)" folder, then open "scopa.html".
The instructions for the game are on the page. I left some comments to better understand the JS code.
I programmed the bot based on my knowledge of the game of "scopa", reasoning about what advantages and disadvantages the opponent or yourself.
I created 4 levels of the bot, with the fourth level having the peculiarity of reasoning based on the opponent's hand: the bot level 4
therefore knows the opponent's hand! However, not considering the luck factor, it happens that even level 1 beats level 4: 
it is normal, since if cards aren't there, they aren't there... in card games even a beginner can beat an expert sometimes...
Therefore, for the sake of time, I omitted those calculations that would make the level 4 bot unbeatable and therefore made it simply "strong."

I added the "Cesco's ace" variant, which would be the ace of swords, for the mere fun of creating a variant. The Cesco's ace is as good as a settebello.


If you want to test the bots, I have left in a program (which is practically identical to the regular one) that allows bots to clash.
You simply define the variables "botZeroLevel" and "botOneLevel" with the level of the bots to be clashed: botZero would be "You" and botOne 
"Opponent." To play the game, you have to choose the level via the above variables and start the game and when you start the game, the bots will play until
the end of the game.

For further information and/or if you encounter a bug, don't hesitate to contact me at:
Francesco Dozio, 
fdozio@outlook.com

Have fun!!!
