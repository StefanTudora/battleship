import './styles.css';
import "@fontsource/orbitron";
import "@fontsource/orbitron/400.css";

function testPressButton() { 
    // Test the button press functionality 

    const div = document.querySelector(".diff-sel");
    if (div !== undefined) {
        div.style.display = 'none';
    }

    const diffButtonList = document.querySelectorAll(".diff-sel button");
    diffButtonList.forEach(button => {
        button.addEventListener('click', () => {
            for (const btn of diffButtonList) {
                btn.classList.remove('retention');
            }
            button.classList.toggle('retention');
        });
    });


    const playerButtonList = document.querySelectorAll(".player-type-sel button")
    playerButtonList.forEach(button => {
        button.addEventListener('click', () => {
            for (const btn of playerButtonList) {
                btn.classList.remove('retention');
            }
            button.classList.toggle('retention');
            const div = document.querySelector(".diff-sel");
            if (div === undefined) {
                console.log('None');
                return;
            }
            if (button.textContent === 'CPU') {
                div.style.display = 'flex';
                console.log("Show");
            } else {
                div.style.display = 'none';
                console.log("Hide");
            }
        });
    });

}

testPressButton();