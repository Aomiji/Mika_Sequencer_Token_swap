// 1. Target character name
const targetName = "Cali";

// 2. Image URLs for transformation
const notTransformed = 'https://assets.forge-vtt.com/6abad095fe0a2212df73fa1a/dima-kasheev-main-pose1.jpg';
const transformed = 'https://assets.forge-vtt.com/6abad095fe0a2212df73fa1a/tom-gambino-render-20.jpg';

// 3. Find Cali's Token on the active canvas scene
const targetToken = canvas.tokens.placeables.find(
    t => t.actor?.name === targetName || t.name === targetName
);

// 4. Find Cali's Actor document in the World
const targetActor = game.actors.getName(targetName);

if (!targetToken && !targetActor) {
    ui.notifications.warn(`Could not find actor or token named "${targetName}"!`);
} else {
    // Determine current image from token (or actor) and toggle
    const currentImg = targetToken
        ? targetToken.document.texture.src
        : targetActor.img;

    const newImg = currentImg === notTransformed ? transformed : notTransformed;

    // Create the Sequence
    const seq = new Sequence();

    // If Cali's token is on the canvas, play effect at Cali's location
    if (targetToken) {
        seq.effect()
            .file("jb2a.misty_step.01.blue")
            .atLocation(targetToken)
            .scaleToObject(2.5)
            .randomRotation();
    }

    seq.wait(1500)
        .thenDo(async () => {
            // Update the token's texture on the active scene
            if (targetToken) {
                await targetToken.document.update({ "texture.src": newImg });
            }

            // Also update the Actor document and Prototype Token image
            if (targetActor) {
                await targetActor.update({
                    "img": newImg,
                    "prototypeToken.texture.src": newImg
                });
            }
        })
        .play();
}
