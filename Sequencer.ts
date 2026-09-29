let notTransformed = 'https://assets.forge-vtt.com/6abad095fe0a2212df73fa1a/dima-kasheev-main-pose1.jpg';
let transformed = 'https://assets.forge-vtt.com/6abad095fe0a2212df73fa1a/tom-gambino-render-20.jpg';

let img = token.document.texture.src === notTransformed ? transformed : notTransformed;

new Sequence()
    .effect()
        .file("jb2a.misty_step.01.blue")
        .atLocation(token)
        .scaleToObject(2.5)
        .randomRotation()
    .wait(1500)
    .thenDo(() => {
        token.document.update({ "texture.src": img });
    })
    .play()