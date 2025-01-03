class Kartya {
    constructor(szin, ertek) {
        this.szin = szin;
        this.ertek = ertek;
    }
    get teljesNev() {
        return `${this.szin}_${this.ertek}`;
    }
}

// Kártyák létrehozása

const kartyak = [
    new Kartya("treff", "asz"), new Kartya("treff", "kiraly"), new Kartya("treff", "dama"), new Kartya("treff", "bubi"), 
    new Kartya("treff", "10"), new Kartya("treff", "9"), new Kartya("treff", "8"), new Kartya("treff", "7"),
    new Kartya("treff", "6"), new Kartya("treff", "5"), new Kartya("treff", "4"), new Kartya("treff", "3"), 
    new Kartya("treff", "2"), new Kartya("karo", "asz"), new Kartya("karo", "kiraly"), new Kartya("karo", "dama"), 
    new Kartya("karo", "bubi"), new Kartya("karo", "10"), new Kartya("karo", "9"), new Kartya("karo", "8"),
    new Kartya("karo", "7"), new Kartya("karo", "6"), new Kartya("karo", "5"), new Kartya("karo", "4"), 
    new Kartya("karo", "3"), new Kartya("karo", "2"), new Kartya("kor", "asz"), new Kartya("kor", "kiraly"), 
    new Kartya("kor", "dama"), new Kartya("kor", "bubi"), new Kartya("kor", "10"), new Kartya("kor", "9"),
    new Kartya("kor", "8"), new Kartya("kor", "7"), new Kartya("kor", "6"), new Kartya("kor", "5"), 
    new Kartya("kor", "4"), new Kartya("kor", "3"), new Kartya("kor", "2"), new Kartya("pikk", "asz"), 
    new Kartya("pikk", "kiraly"), new Kartya("pikk", "dama"), new Kartya("pikk", "bubi"), new Kartya("pikk", "10"),
    new Kartya("pikk", "9"), new Kartya("pikk", "8"), new Kartya("pikk", "7"), new Kartya("pikk", "6"), 
    new Kartya("pikk", "5"), new Kartya("pikk", "4"), new Kartya("pikk", "3"), new Kartya("pikk", "2")
];

// Szükséges változók
let kartyaNevek = [];
let egyenleg = 1000
let ellenfel_1_egyenleg = 1000
let ellenfel_2_egyenleg = 1000
let tet = 0;
let ellenfel_1_Pont = 0
let ellenfel_2_Pont = 0
let enPontom = 0
let utolsoEmeles = 0
let ellenfel1emelese = 0
let ellenfel2emelese = 0
let ellenfel_1_kiesett = false
let ellenfel_2_kiesett = false
let ellenfel_1_dobott = false
let ellenfel_2_dobott = false
let korVege = false
let dobtam = false


let isPair, isPairEnemy1, isPairEnemy2 = false;
let isTwoPair, isTwoPairEnemy1, isTwoPairEnemy2 = false;
let isThreeOfAKind, isThreeOfAKindEnemy1, isThreeOfAKindEnemy2 = false;
let isStraight, isStraightEnemy1, isStraightEnemy2 = false;
let isFlush, isFlushEnemy1, isFlushEnemy2 = false;
let isFullHouse, isFullHouseEnemy1, isFullHouseEnemy2 = false;
let isFourOfAKind, isFourOfAKindEnemy1, isFourOfAKindEnemy2 = false;
let isStraightFlush, isStraightFlushEnemy1, isStraightFlushEnemy2 = false;
let isRoyalFlush, isRoyalFlushEnemy1, isRoyalFlushEnemy2 = false;

// Random kártya fgv
function randomKartya(kartyaID) {
    const randomIndex = Math.floor(Math.random() * kartyak.length);
    const randomKartya = kartyak.splice(randomIndex, 1)[0];

    kartyaNevek.push(randomKartya);

    const card = document.getElementById(kartyaID);
    card.classList.add('flip');

    setTimeout(() => {
        card.style.backgroundImage = `url(kartyak/${randomKartya.teljesNev}.jpeg)`;
        setTimeout(() => {
            card.classList.remove('flip');
        }, 1);
    }, 300);
}

function randomKartyaEnemy(kartyaID) {
    const randomIndex = Math.floor(Math.random() * kartyak.length);
    const randomKartya = kartyak.splice(randomIndex, 1)[0];

    kartyaNevek.push(randomKartya);

    const card = document.getElementById(kartyaID);
    card.classList.add('flip');

    setTimeout(() => {
        card.style.backgroundImage = `url(kartyak/background.jpeg)`;
        setTimeout(() => {
            card.classList.remove('flip');
        }, 1);
    }, 300);
}

// Asztal lapok felfordítása
let statusz = 1;
function mehetAJatek() {
    switch (statusz) {
        case 1:
            randomKartya('card1');
            kartya1 = kartyaNevek[6];
            randomKartya('card2');
            kartya2 = kartyaNevek[7];
            randomKartya('card3');
            kartya3 = kartyaNevek[8];
            if(!ellenfel_1_kiesett) { ellenfelEmel([enemy1Card1, enemy1Card2], [kartya1, kartya2, kartya3], 1, ellenfel_1_egyenleg, utolsoEmeles)}
            vanKiesett()
            if (!ellenfel_2_kiesett) { ellenfelEmel([enemy2Card1, enemy2Card2], [kartya1, kartya2, kartya3], 2, ellenfel_2_egyenleg, ellenfel1emelese)}
            vanKiesett()
            updateUI()
            if (ellenfel2emelese > 0 || ellenfel1emelese > 0 && dobtam == false) {
                document.getElementById('mehet').disabled = true
                document.getElementById('mehet').style.cursor = 'not-allowed'
            }
            statusz++;
            break;
        case 2:
            randomKartya('card4');
            kartya4 = kartyaNevek[9];
            if(!ellenfel_1_kiesett) { ellenfelEmel([enemy1Card1, enemy1Card2], [kartya1, kartya2, kartya3, kartya4], 1, ellenfel_1_egyenleg), utolsoEmeles }
            vanKiesett()
            if (!ellenfel_2_kiesett) { ellenfelEmel([enemy2Card1, enemy2Card2], [kartya1, kartya2, kartya3, kartya4], 2, ellenfel_2_egyenleg, ellenfel1emelese) }
            vanKiesett()
            updateUI()
            if (ellenfel2emelese > 0 || ellenfel1emelese > 0 && dobtam == false) {
                document.getElementById('mehet').disabled = true
                document.getElementById('mehet').style.cursor = 'not-allowed'
            }
            statusz++;
            break;
        case 3:
            randomKartya('card5');
            kartya5 = kartyaNevek[10];
            if(!ellenfel_1_kiesett) { ellenfelEmel([enemy1Card1, enemy1Card2], [kartya1, kartya2, kartya3, kartya4, kartya5], 1, ellenfel_1_egyenleg, utolsoEmeles) }
            vanKiesett()
            if (!ellenfel_2_kiesett) { ellenfelEmel([enemy2Card1, enemy2Card2], [kartya1, kartya2, kartya3, kartya4, kartya5], 2, ellenfel_2_egyenleg, ellenfel1emelese) }
            vanKiesett()
            if (ellenfel2emelese > 0 || ellenfel1emelese > 0 && dobtam == false) {
                document.getElementById('mehet').disabled = true
                document.getElementById('mehet').style.cursor = 'not-allowed'
            }
            updateUI()
            document.getElementById('mehet').textContent = "Értékelés"
            statusz++;
            break;
        case 4:
            felfed()
            naMidVan()
            kiertekeles()
            updateUI()
            korVege = true
            checkGameOver()
            document.getElementById('mehet').textContent = "Új játék"
            statusz++
            break;
        case 5:
            ujJatek()
            document.getElementById('mehet').textContent = "Mehet!"
            console.log("Már minden kártya megfordult.");
            break;
    }
}

function naMidVan() {
    const kezKartyak = [myCard1, myCard2];
    const enemy1kezKartyak = [enemy1Card1, enemy1Card2];
    const enemy2kezKartyak = [enemy2Card1, enemy2Card2];
    const asztalKartyak = kartyaNevek.slice(6, 11);

    // Saját kártyák kiértékelése
    isPair = vanPar(kezKartyak, asztalKartyak);
    if (isPair) { enPontom = 1; }

    isTwoPair = vanDuplaPar(kezKartyak, asztalKartyak);
    if (isTwoPair) { enPontom = 2; }

    isThreeOfAKind = vanDrill(kezKartyak, asztalKartyak);
    if (isThreeOfAKind) { enPontom = 3; }

    isStraight = vanSor(kezKartyak, asztalKartyak);
    if (isStraight) { enPontom = 4; }

    isFlush = vanFlush(kezKartyak, asztalKartyak);
    if (isFlush) { enPontom = 5; }

    isFullHouse = vanFullHouse(kezKartyak, asztalKartyak);
    if (isFullHouse) { enPontom = 6; }

    isFourOfAKind = vanPoker(kezKartyak, asztalKartyak);
    if (isFourOfAKind) { enPontom = 7; }

    isStraightFlush = vanSzinsor(kezKartyak, asztalKartyak);
    if (isStraightFlush) { enPontom = 8; }

    isRoyalFlush = vanRoyalFlush(kezKartyak, asztalKartyak);
    if (isRoyalFlush) { enPontom = 9; }

    // Első ellenfél kártyáinak kiértékelése
    isPairEnemy1 = vanPar(enemy1kezKartyak, asztalKartyak);
    if (isPairEnemy1) { ellenfel_1_Pont = 1; }

    isTwoPairEnemy1 = vanDuplaPar(enemy1kezKartyak, asztalKartyak);
    if (isTwoPairEnemy1) { ellenfel_1_Pont = 2; }

    isThreeOfAKindEnemy1 = vanDrill(enemy1kezKartyak, asztalKartyak);
    if (isThreeOfAKindEnemy1) { ellenfel_1_Pont = 3; }

    isStraightEnemy1 = vanSor(enemy1kezKartyak, asztalKartyak);
    if (isStraightEnemy1) { ellenfel_1_Pont = 4; }

    isFlushEnemy1 = vanFlush(enemy1kezKartyak, asztalKartyak);
    if (isFlushEnemy1) { ellenfel_1_Pont = 5; }

    isFullHouseEnemy1 = vanFullHouse(enemy1kezKartyak, asztalKartyak);
    if (isFullHouseEnemy1) { ellenfel_1_Pont = 6; }

    isFourOfAKindEnemy1 = vanPoker(enemy1kezKartyak, asztalKartyak);
    if (isFourOfAKindEnemy1) { ellenfel_1_Pont = 7; }

    isStraightFlushEnemy1 = vanSzinsor(enemy1kezKartyak, asztalKartyak);
    if (isStraightFlushEnemy1) { ellenfel_1_Pont = 8; }

    isRoyalFlushEnemy1 = vanRoyalFlush(enemy1kezKartyak, asztalKartyak);
    if (isRoyalFlushEnemy1) { ellenfel_1_Pont = 9; }

    if (ellenfel_1_dobott || ellenfel_1_kiesett) {ellenfel_1_Pont = 0}

    // Második ellenfél kártyáinak kiértékelése
    isPairEnemy2 = vanPar(enemy2kezKartyak, asztalKartyak);
    if (isPairEnemy2) { ellenfel_2_Pont = 1; }

    isTwoPairEnemy2 = vanDuplaPar(enemy2kezKartyak, asztalKartyak);
    if (isTwoPairEnemy2) { ellenfel_2_Pont = 2; }

    isThreeOfAKindEnemy2 = vanDrill(enemy2kezKartyak, asztalKartyak);
    if (isThreeOfAKindEnemy2) { ellenfel_2_Pont = 3; }

    isStraightEnemy2 = vanSor(enemy2kezKartyak, asztalKartyak);
    if (isStraightEnemy2) { ellenfel_2_Pont = 4; }

    isFlushEnemy2 = vanFlush(enemy2kezKartyak, asztalKartyak);
    if (isFlushEnemy2) { ellenfel_2_Pont = 5; }

    isFullHouseEnemy2 = vanFullHouse(enemy2kezKartyak, asztalKartyak);
    if (isFullHouseEnemy2) { ellenfel_2_Pont = 6; }

    isFourOfAKindEnemy2 = vanPoker(enemy2kezKartyak, asztalKartyak);
    if (isFourOfAKindEnemy2) { ellenfel_2_Pont = 7; }

    isStraightFlushEnemy2 = vanSzinsor(enemy2kezKartyak, asztalKartyak);
    if (isStraightFlushEnemy2) { ellenfel_2_Pont = 8; }

    isRoyalFlushEnemy2 = vanRoyalFlush(enemy2kezKartyak, asztalKartyak);
    if (isRoyalFlushEnemy2) { ellenfel_2_Pont = 9; }

    if (ellenfel_2_dobott || ellenfel_2_kiesett) {ellenfel_2_Pont = 0}
}

function hand(pont) {
    let kez = ""
    switch(pont) {
        case 1: 
            kez = "Pár";
            break
        case 2:
            kez = "Dupla Pár"
            break
        case 3:
            kez = "Drill"
            break
        case 4:
            kez = "Számsor"
            break
        case 5:
            kez = "Flush"
        case 6: 
            kez = "Full House"
            break
        case 7:
            kez = "Poker"
            break
        case 8:
            kez = "Színsor"
            break
        case 9:
            kez = "Royal Flush"
            break
        default:
            kez = "Nincs"
            break
    }
    return kez
}

function mindenkiDobta() {
    if (ellenfel_1_dobott && ellenfel_2_dobott) {
        alert ("Mindenki dobta. Nyertél " + tet + "$-t")
        egyenleg += tet
        tet = 0
        ujJatek()
    }
}

function kiertekeles() {
    let nyertes = 0
    let index = 0
    let jatekosok = [enPontom, ellenfel_1_Pont, ellenfel_2_Pont]
    for (let i = 0; i < jatekosok.length; i++) {
        if (jatekosok[i] > nyertes) {
            nyertes = jatekosok[i]
            index = i
        }
    }
    switch(jatekosok[index]){
        case enPontom:
            egyenleg += tet
            document.getElementById('eredmeny').textContent = "Nyertél " + tet + "$-t!" + "   Hand: " + hand(enPontom)
            tet = 0
            updateUI()
            break
        case ellenfel_1_Pont:
            ellenfel_1_egyenleg += tet
            document.getElementById('eredmeny').textContent = "Kártyás Kata nyert " + tet + "$-t" + "   Hand: " + hand(ellenfel_1_Pont)
            tet = 0
            updateUI()
            break
        case ellenfel_2_Pont:
            ellenfel_2_egyenleg += tet
            document.getElementById('eredmeny').textContent = "All-in András nyert " + tet + "$-t" + "   Hand: " + hand(ellenfel_2_Pont)
            tet = 0
            updateUI()
            break
        default:
            console.log("Hiba")
    }
}

//ellenfél lapjainak felfedése
function felfed() {
    document.getElementById('enemyCard1-1').style.backgroundImage = `url(kartyak/${enemy1Card1.teljesNev}.jpeg)`
    document.getElementById('enemyCard1-2').style.backgroundImage = `url(kartyak/${enemy1Card2.teljesNev}.jpeg)`
    document.getElementById('enemyCard2-1').style.backgroundImage = `url(kartyak/${enemy2Card1.teljesNev}.jpeg)`
    document.getElementById('enemyCard2-2').style.backgroundImage = `url(kartyak/${enemy2Card2.teljesNev}.jpeg)`
}

//UI frissítése
function updateUI(){
    document.getElementById('egyenleg').textContent = egyenleg + "$"
    document.getElementById('tet').textContent = tet + "$"
    document.getElementById('ellenfel_1_egyenleg').textContent =  "Kártyás Kata: " + ellenfel_1_egyenleg + "$"
    document.getElementById('ellenfel_2_egyenleg').textContent = "All-in András: " + ellenfel_2_egyenleg + "$"
    if (ellenfel_1_dobott) {document.getElementById('ellenfel1info').textContent = "Kártyás Kata dobott"}
    if (ellenfel_2_dobott) {document.getElementById('ellenfel2info').textContent = "All-in András dobott"}
    if (ellenfel_1_kiesett) {document.getElementById('ellenfel1info').textContent = "Kártyás Kata kiesett"}
    if (ellenfel_2_kiesett) {document.getElementById('ellenfel2info').textContent = "All-in András kiesett"}
    
}

// Kézben lévő lapok kiosztása
function sajatLapokOsztas() {
    randomKartya('myCard1');
    myCard1 = kartyaNevek[0];
    randomKartya('myCard2');
    myCard2 = kartyaNevek[1];

    randomKartyaEnemy('enemyCard1-1')
    enemy1Card1 = kartyaNevek[2]
    randomKartyaEnemy('enemyCard1-2')
    enemy1Card2 = kartyaNevek[3]

    randomKartyaEnemy('enemyCard2-1')
    enemy2Card1 = kartyaNevek[4]
    randomKartyaEnemy('enemyCard2-2')
    enemy2Card2 = kartyaNevek[5]
    
}

// Tét megadása 
function emel(osszeg, jatekos){
    switch(jatekos){
        case 1:
            if (osszeg > ellenfel_1_egyenleg) {
                osszeg = ellenfel_1_egyenleg
                ellenfel1emelese = osszeg
                if (osszeg > 0) {moveImage('zseton1')}
            }
            else {
                ellenfel_1_egyenleg -= osszeg
                ellenfel1emelese = osszeg
                if (osszeg > 0) {moveImage('zseton1')}
            }
            break;
        case 2:
            if (osszeg > ellenfel_2_egyenleg) {
                osszeg = ellenfel_2_egyenleg
                ellenfel2emelese = osszeg
                if (osszeg > 0) {moveImage('zseton2')}
            }
            else {
               ellenfel_2_egyenleg -= osszeg 
               ellenfel2emelese = osszeg
               if (osszeg > 0) {moveImage('zseton2')}
            }
            break;
        case 3:
            if (ellenfel2emelese > osszeg && dobtam == false) {
                alert("Ennél nagyobbat kell emelned: " + ellenfel2emelese)
                osszeg = 0
            }
            else {
                egyenleg -= osszeg
                utolsoEmeles = osszeg
                moveImage('zseton3')
                document.getElementById('mehet').disabled = false
                document.getElementById('mehet').style.cursor = 'default'
            }
            break;
        default:
            console.log("Nincs ilyen játékos")
    }
    tet += osszeg
    updateUI()
}
function emel_custom(){
    sajatOsszeg = parseInt(document.getElementById('sajat-osszeg').value, 10)
    emel(sajatOsszeg, 3)
    updateUI()
}

//elenfel emel
function ellenfelEmel(kezKartyak, asztalKartyak, ellenfel, egyenleg, limit) {
    if (vanRoyalFlush(kezKartyak,asztalKartyak)){
        ertek = egyenleg
        emel(ertek,ellenfel)
        if (ellenfel == 1) {document.getElementById('ellenfel1info').textContent = "Kártyás Kata emelt: " + ertek }
        if (ellenfel == 2) {document.getElementById('ellenfel2info').textContent = "All-in András emelt: " + ertek }
    }
    if (vanSzinsor(kezKartyak,asztalKartyak)){
        ertek = randomSzam(500, 1000)
        if (ertek > egyenleg) {ertek = egyenleg}
        if (ertek < limit) {ellenfelDobas(ellenfel)}
        emel(ertek,ellenfel)
        if (ellenfel == 1) {document.getElementById('ellenfel1info').textContent = "Kártyás Kata emelt: " + ertek }
        if (ellenfel == 2) {document.getElementById('ellenfel2info').textContent = "All-in András emelt: " + ertek }
    }
    if (vanPoker(kezKartyak, asztalKartyak)){
        ertek = randomSzam(200, 500)
        if (ertek > egyenleg) {ertek = egyenleg}
        if (ertek < limit) {ellenfelDobas(ellenfel)}
        emel(ertek,ellenfel)
        if (ellenfel == 1) {document.getElementById('ellenfel1info').textContent = "Kártyás Kata emelt: " + ertek }
        if (ellenfel == 2) {document.getElementById('ellenfel2info').textContent = "All-in András emelt: " + ertek }
    }
    if (vanFullHouse(kezKartyak,asztalKartyak)){
        ertek = randomSzam(200, 400)
        if (ertek > egyenleg) {ertek = egyenleg}
        if (ertek < limit) {ellenfelDobas(ellenfel)}
        emel(ertek, ellenfel)
        if (ellenfel == 1) {document.getElementById('ellenfel1info').textContent = "Kártyás Kata emelt: " + ertek }
        if (ellenfel == 2) {document.getElementById('ellenfel2info').textContent = "All-in András emelt: " + ertek }
    }
    if (vanFlush(kezKartyak,asztalKartyak)){
        ertek = randomSzam(100, 300)
        if (ertek > egyenleg) {ertek = egyenleg}
        if (ertek < limit) {ellenfelDobas(ellenfel)}
        emel(ertek, ellenfel)
        if (ellenfel == 1) {document.getElementById('ellenfel1info').textContent = "Kártyás Kata emelt: " + ertek }
        if (ellenfel == 2) {document.getElementById('ellenfel2info').textContent = "All-in András emelt: " + ertek }
    }
    if (vanSor(kezKartyak,asztalKartyak)){
        ertek = randomSzam(50, 200)
        if (ertek > egyenleg) {ertek = egyenleg}
        if (ertek < limit) {ellenfelDobas(ellenfel)}
        emel(ertek,ellenfel)
        if (ellenfel == 1) {document.getElementById('ellenfel1info').textContent = "Kártyás Kata emelt: " + ertek }
        if (ellenfel == 2) {document.getElementById('ellenfel2info').textContent = "All-in András emelt: " + ertek }
    }
    if (vanDrill(kezKartyak,asztalKartyak)){
        ertek = randomSzam(10, 100)
        if (ertek > egyenleg) {ertek = egyenleg}
        if (ertek < limit) {ellenfelDobas(ellenfel)}
        emel(ertek,ellenfel)
        if (ellenfel == 1) {document.getElementById('ellenfel1info').textContent = "Kártyás Kata emelt: " + ertek }
        if (ellenfel == 2) {document.getElementById('ellenfel2info').textContent = "All-in András emelt: " + ertek }
    }
    if (vanDuplaPar(kezKartyak,asztalKartyak)) {
        ertek = randomSzam(10, 70)
        if (ertek > egyenleg) {ertek = egyenleg}
        if (ertek < limit) {ellenfelDobas(ellenfel)}
        emel(ertek,ellenfel)
        if (ellenfel == 1) {document.getElementById('ellenfel1info').textContent = "Kártyás Kata emelt: " + ertek }
        if (ellenfel == 2) {document.getElementById('ellenfel2info').textContent = "All-in András emelt: " + ertek }
    }
    if (vanPar(kezKartyak, asztalKartyak)) {
        ertek = randomSzam(10, 50)
        if (ertek > egyenleg) {ertek = egyenleg}
        if (ertek < limit) {ellenfelDobas(ellenfel)}
        emel(ertek,ellenfel)
        if (ellenfel == 1) {document.getElementById('ellenfel1info').textContent = "Kártyás Kata emelt: " + ertek }
        if (ellenfel == 2) {document.getElementById('ellenfel2info').textContent = "All-in András emelt: " + ertek }
    }
    else {emel(0,ellenfel)
        if (ellenfel == 1) {document.getElementById('ellenfel1info').textContent = "Kártyás Kata: Passz" }
        if (ellenfel == 2) {document.getElementById('ellenfel2info').textContent = "All-in András: Passz" }
    }
}

function ellenfelDobas(ellenfel) {
    if (ellenfel == 1) {ellenfel_1_dobott = true}
    if (ellenfel == 2) {ellenfel_2_dobott = true}
}

function StartGame(){
    sajatLapokOsztas()
    document.getElementById('startGame').textContent = "Poker"
    document.getElementById('startGame').disabled = true

    document.getElementById('mehet').disabled = false
    document.getElementById('mehet').style.cursor = 'default'
    document.getElementById('zseton-1').disabled = false
    document.getElementById('zseton-1').style.cursor = 'default'
    document.getElementById('zseton-5').disabled = false
    document.getElementById('zseton-5').style.cursor = 'default'
    document.getElementById('zseton-10').disabled = false
    document.getElementById('zseton-10').style.cursor = 'default'
    document.getElementById('zseton-25').disabled = false
    document.getElementById('zseton-25').style.cursor = 'default'
    document.getElementById('zseton-100').disabled = false
    document.getElementById('zseton-100').style.cursor = 'default'
    document.getElementById('emel').disabled = false
    document.getElementById('emel').style.cursor = 'default'
    document.getElementById('dob').disabled = false
    document.getElementById('dob').style.cursor = 'default'

    ellenfelEmel([enemy1Card1, enemy1Card2], [], 1, ellenfel_1_egyenleg, utolsoEmeles, 0)
    ellenfelEmel([enemy2Card1, enemy2Card2], [], 2, ellenfel_2_egyenleg, ellenfel1emelese, 0)
}

// Játék vége ellenőrzése
function checkGameOver() {
    if (egyenleg <= 0 && korVege) {
        if (confirm("Elvesztetted az összes pénzed! Szeretnéd újra kezdeni a játékot?")) {
            location.reload()
        }
    }
    
    if (egyenleg >= 3000){
        if (confirm("Elnyerted mindenki pénzét! Szeretnéd újra kezdeni a játékot?")) {
            location.reload()
        }
    }

    if (ellenfel_1_egyenleg <= 0 && korVege) {
        ellenfel_1_kiesett = true
        vanKiesett()
    }
    if (ellenfel_2_egyenleg <= 0 && korVege) {
        ellenfel_2_kiesett = true
        vanKiesett()
    }
    
}

function vanKiesett() {
    if (ellenfel_1_kiesett || ellenfel_1_dobott) {
        document.getElementById('enemyCard1-1').style.visibility = "hidden"
        document.getElementById('enemyCard1-2').style.visibility = "hidden"
        document.getElementById('ellenfel_1_egyenleg').style.visibility = "hidden"
        document.getElementById('zseton1').style.visibility = "hidden"
    }
    if (ellenfel_2_kiesett || ellenfel_2_dobott) {
        document.getElementById('enemyCard2-1').style.visibility = "hidden"
        document.getElementById('enemyCard2-2').style.visibility = "hidden"
        document.getElementById('ellenfel_2_egyenleg').style.visibility = "hidden"
        document.getElementById('zseton2').style.visibility = "hidden"
    }
}

function dobas() {
    document.getElementById('myCard1').style.visibility = "hidden"
    document.getElementById('myCard2').style.visibility = "hidden"
    document.getElementById('egyenleg').style.visibility = "hidden"
    document.getElementById('zseton3').style.visibility = "hidden"
    dobtam = true
    document.getElementById('mehet').disabled = false
    document.getElementById('mehet').style.cursor = 'default'
    enPontom = -1
}

function ellenfelVissza(){
    if (!ellenfel_1_kiesett) {
    document.getElementById('enemyCard1-1').style.visibility = "visible"
    document.getElementById('enemyCard1-2').style.visibility = "visible"
    document.getElementById('ellenfel_1_egyenleg').style.visibility = "visible"
    }
    if (!ellenfel_2_kiesett) {
        document.getElementById('enemyCard2-1').style.visibility = "visible"
        document.getElementById('enemyCard2-2').style.visibility = "visible"
        document.getElementById('ellenfel_2_egyenleg').style.visibility = "visible"
    }
    document.getElementById('myCard1').style.visibility = "visible"
    document.getElementById('myCard2').style.visibility = "visible"
    document.getElementById('egyenleg').style.visibility = "visible"
    document.getElementById('zseton3').style.visibility = "visible"
}


function ujJatek() {
    document.getElementById('card1').style.backgroundImage = "url(kartyak/background.jpeg)";
    document.getElementById('card2').style.backgroundImage = "url(kartyak/background.jpeg)";
    document.getElementById('card3').style.backgroundImage = "url(kartyak/background.jpeg)";
    document.getElementById('card4').style.backgroundImage = "url(kartyak/background.jpeg)";
    document.getElementById('card5').style.backgroundImage = "url(kartyak/background.jpeg)";
    document.getElementById('eredmeny').textContent = "-";
    kartyak.push(...kartyaNevek);
    kartyaNevek.length = 0;
    statusz = 1;
    korVege = false;
    ellenfel_1_dobott = false;
    ellenfel_2_dobott = false;
    dobtam = false;
    ellenfelVissza();
    sajatLapokOsztas();
    updateChips(egyenleg);
}




//————————————————————————————————————————————————————————
// Kiértékeléshez használható függvények
//________________________________________________________
//pár
function vanPar(kezKartyak, asztalKartyak) {
    for (const myCard of kezKartyak) {
        for (const tableCard of asztalKartyak) {
            if (myCard.ertek === tableCard.ertek) {
                return true;
            }
        }
    }
    if (kezKartyak[0].ertek == kezKartyak[1].ertek) {return true}
    return false;
}

//dupla pár
function vanDuplaPar(kezKartyak, asztalKartyak){
    par = 0
    for (const myCard of kezKartyak) {
        for (const tableCard of asztalKartyak) {
            if (myCard.ertek == tableCard.ertek) {
                par++
            }
        }
    }
    if (par >= 2) {
        return true
    }
    else {return false}
}

//drill
function vanDrill(kezKartyak, asztalKartyak) {
    drillSzamlalo = 1
    if ( kezKartyak[0].ertek == kezKartyak[1].ertek ) {drillSzamlalo++}
    for (const myCard of kezKartyak) {
        for (const tableCard of asztalKartyak) {
            if (myCard.ertek == tableCard.ertek) {
                drillSzamlalo++
            }
        }
    }
    if (drillSzamlalo == 3) {return true}
    return false
}

//sor
function vanSor(kezKartyak, asztalKartyak) {
    const osszesKartya = [...kezKartyak, ...asztalKartyak];
    const ertekekRangsora = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "bubi", "dama", "kiraly", "asz"];

    const ertekekSzamok = osszesKartya
        .map(kartya => ertekekRangsora.indexOf(kartya.ertek))
        .filter(index => index !== -1)
        .sort((a, b) => a - b);

    const egyediErtekek = [...new Set(ertekekSzamok)];

    for (let i = 0; i <= egyediErtekek.length - 5; i++) {
        if (
            egyediErtekek[i + 4] - egyediErtekek[i] === 4 && 
            egyediErtekek.slice(i, i + 5).every((v, j) => v === egyediErtekek[i] + j)
        ) {
            return true;
        }
    }

    if (egyediErtekek.includes(ertekekRangsora.indexOf("asz")) &&
        egyediErtekek.includes(0) && egyediErtekek.includes(1) &&
        egyediErtekek.includes(2) && egyediErtekek.includes(3)) {
        return true;
    }

    return false;
}

//flush
function vanFlush(kezKartyak, asztalKartyak) {
    const osszesKartya = [...kezKartyak, ...asztalKartyak];

    // Színek számlálása
    const szinekSzamlalo = {};

    for (const kartya of osszesKartya) {
        if (szinekSzamlalo[kartya.szin]) {
            szinekSzamlalo[kartya.szin]++;
        } else {
            szinekSzamlalo[kartya.szin] = 1;
        }
    }

    for (const szin in szinekSzamlalo) {
        if (szinekSzamlalo[szin] >= 5) {
            return true;
        }
    }

    return false;
}

//full house
function vanFullHouse(kezKartyak, asztalKartyak){
    if (vanPar(kezKartyak,asztalKartyak) && vanDrill(kezKartyak,asztalKartyak)){
        return true
    }
    return false
}

//poker
function vanPoker(kezKartyak, asztalKartyak) {
    const osszesKartya = [...kezKartyak, ...asztalKartyak]
    szamlalo = 0
    for (let i = 0; i < osszesKartya.length; i++){
        for (let j = 0; j < osszesKartya.length; j++){
            if (osszesKartya[i].ertek == osszesKartya[j].ertek){
                szamlalo++
            }
            if (szamlalo >= 4){
                return true
            }
        }
        szamlalo = 0
    }
    return false
}

//színsor
function vanSzinsor(kezKartyak, asztalKartyak) {
    if (vanFlush(kezKartyak, asztalKartyak) && vanSor(kezKartyak, asztalKartyak)) {
        return true;
    }
    return false;
}

//royal flush
function vanRoyalFlush(kezKartyak,asztalKartyak) {
    const osszesKartya = [...kezKartyak, ...asztalKartyak]
    szamlalo = 0
    if (isFlush){
        for (let i = 0; i < osszesKartya.length; i++){
            if (["asz","kiraly","dama", "bubi","10"].includes(osszesKartya[i].ertek)) {
                szamlalo++
            }
        }
    }
    if (szamlalo >= 5) {return true}
    return false
    
}
//————————————————————————————————————————————————————————
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::
//________________________________________________________

function randomSzam(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function moveImage(jatekosKupac) {
    const originalImage = document.getElementById(jatekosKupac);
    const copy = originalImage.cloneNode(true);
    copy.id = 'moving-copy';
    
    document.body.appendChild(copy);
    
    const rect = originalImage.getBoundingClientRect();
    copy.style.top = `${rect.top}px`;
    copy.style.left = `${rect.left}px`;
    
    const target = document.getElementById('zsetonHalom').getBoundingClientRect();
    
    setTimeout(() => {
      copy.style.top = `${target.top}px`;
      copy.style.left = `${target.left}px`;
    }, 100);
    
    setTimeout(() => {
      copy.remove();
    }, 1000);
  }
  

window.onload = function() {
    document.getElementById('mehet').disabled = true
    document.getElementById('mehet').style.cursor = 'not-allowed'
    document.getElementById('dob').disabled = true
    document.getElementById('dob').style.cursor = 'not-allowed'
    document.getElementById('emel').disabled = true
    document.getElementById('emel').style.cursor = 'not-allowed'
    document.getElementById('zseton-1').disabled = true
    document.getElementById('zseton-1').style.cursor = 'not-allowed'
    document.getElementById('zseton-5').disabled = true
    document.getElementById('zseton-5').style.cursor = 'not-allowed'
    document.getElementById('zseton-10').disabled = true
    document.getElementById('zseton-10').style.cursor = 'not-allowed'
    document.getElementById('zseton-25').disabled = true
    document.getElementById('zseton-25').style.cursor = 'not-allowed'
    document.getElementById('zseton-100').disabled = true
    document.getElementById('zseton-100').style.cursor = 'not-allowed'

}

function getChips() {
    fetch('updateChips.php', { method: 'GET' })
        .then(response => response.json())
        .then(data => {
            if (data.chips !== undefined) {
                egyenleg = data.chips;
                document.getElementById('egyenleg').textContent = `${egyenleg}$`;
            }
        })
        .catch(error => console.error('Error fetching chips:', error));
}

function updateChips(newChips) {
    fetch('updateChips.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `chips=${newChips}`
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                egyenleg = data.chips;
                document.getElementById('egyenleg').textContent = `${egyenleg}$`;
            } else {
                console.error('Error updating chips:', data.error);
            }
        })
        .catch(error => console.error('Error updating chips:', error));
}

setInterval(getChips, 1000);


