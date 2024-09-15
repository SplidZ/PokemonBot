export default (client) => {

    client.on("ready", () => {
        console.log(`@${client.user.username} est prêt !`);
    });
    
};