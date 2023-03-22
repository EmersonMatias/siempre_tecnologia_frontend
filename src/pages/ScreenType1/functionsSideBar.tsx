export function passwordConfigs(event: React.KeyboardEvent<HTMLDivElement>, password: number, setPassword: React.Dispatch<React.SetStateAction<number>>,passworDigit: string, setPasswordDigit: React.Dispatch<React.SetStateAction<string>>) {
    if(event.key === "Enter"){
        
        if(passworDigit.length){
            setPasswordDigit("")
            return setPassword(Number(passworDigit))
        }

        setPassword(password + 1)

        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance();
            utterance.text = `Senha ${password + 1}. Repetindo, senha ${password + 1}`;
            utterance.lang = 'pt-BR';
            utterance.rate = 1;
            utterance.pitch = 1;
            utterance.volume = 1;
            speechSynthesis.speak(utterance);
        }
    }

    if(!isNaN(Number(event.key))){
        setPasswordDigit(passworDigit+event.key)
        console.log(passworDigit)
    }

    if(event.key === "Escape"){
        setPasswordDigit("")
    }

}