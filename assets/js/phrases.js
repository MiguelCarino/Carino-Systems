document.addEventListener("DOMContentLoaded", function () {
    const phrases = [
        "「 In doubt, reboot. 」",
        "「 Viruses are often inadvertently accepted by thee. 」",
        "「 Never trust blindly. Question first. 」",
        "「 Copy your files instead of cutting them. 」",
        "「 Update when you have time; otherwise, it will update when you don't. 」",
        "「 You can't download RAM. 」",
        "「 The Cloud is mostly on land and underwater. 」",
        "「 Clean your keyboard thoroughly at least once a year. 」",
        "「 Antivirus software is useless against bad digital practices. 」",
        "「 All software is licensed, even if it's offered for free. 」",
        "「 Being 100% anonymous on the internet is virtually impossible. 」",
        "「 A reliable backup consists of three copies: two on different storage types, and one offsite. 」",
        "「 Data redundancy is not a backup. 」",
        "「 Social engineering is often more effective than hacking. 」",
        "「 Your digital footprint is permanent; think before you post. 」",
        "「 Your device is only as secure as your habits. 」",
        "「 Remembering your passwords is a flaw; use a password manager instead. 」",
        "「 AI is often a misleading commercial term, just like 'High Definition.' 」",
        "「 Automation doesn't guarantee optimization. 」"
    ];

    const randomPhraseElement = document.getElementById("random-phrase");
    if (randomPhraseElement) {
        const randomIndex = Math.floor(Math.random() * phrases.length);
        randomPhraseElement.textContent = phrases[randomIndex];
    }
    });