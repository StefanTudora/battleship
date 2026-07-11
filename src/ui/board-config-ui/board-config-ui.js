

// This is where the boards are being configured
const boardConfig = (players) => {

    const playerList = players;

    const getDisplay = () => {
        // Here get the display
        const display = document.createElement('div');
        display.setAttribute('id', 'ship-config');
        // Add here the logic

        
        
        return display; 
    };

    return {getDisplay};
}

export default boardConfig;