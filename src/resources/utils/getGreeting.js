export function getGreeting() {
    const currentHour = new Date().getHours();
    
    if (currentHour >= 6 && currentHour < 12) {
        return "Bom Dia!";
    } else if (currentHour >= 12 && currentHour < 18) {
        return "Boa Tarde!";
    } else {
        return "Boa Noite!";
    }
}