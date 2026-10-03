const targetName = "Lumière";
const notTransformed = 'worlds/daram-sin/PJ/Lum/Mika_JDR_Ratel.png';
const transformed = 'worlds/daram-sin/PJ/Lum/Lum_Ratel.jpg';

const targetActor = game.actors.getName(targetName);

if (!targetActor) {
    ui.notifications.warn(`Could not find actor named "${targetName}"!`);
} else {
    const tokens = targetActor.getActiveTokens();

    const currentImg = targetActor.img;
    const newImg = currentImg === notTransformed ? transformed : notTransformed;

    const seq = new Sequence();

    for (const t of tokens) {
        seq.effect()
            .file("jb2a.misty_step.01.blue")
            .atLocation(t)
            .scaleToObject(2.5)
            .randomRotation();
    }

    seq.wait(1500)
        .thenDo(async () => {
            for (const t of tokens) {
                await t.document.update({ "texture.src": newImg });
            }

            await targetActor.update({
                "img": newImg,
                "prototypeToken.texture.src": newImg
            });
        })
        .play();
}