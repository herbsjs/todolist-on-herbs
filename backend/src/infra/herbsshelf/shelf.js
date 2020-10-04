const html = (usecases) => `
<!DOCTYPE html>
<html>
    <head>
        <meta charset=utf-8 />
        <title>Herbs Shelf</title>
    </head>
    <body>
        ${bodyHTML(usecases)}
    </body>
</html>
`

const bodyHTML = (usecases) => `
<h1>Use Cases</h1>
${useCasesHTML(usecases)}
`

const useCasesHTML = (usecases) => {
    let html = ``
    for (const [ucsGroup, ucs] of Object.entries(usecases)) {
        html += `<h2>${ucsGroup}</h2>`
        for (const uc of ucs) {
            const doc = uc.doc()
            html += `<h3>${doc.description}</h3>`
            html += `<p>Steps: ${stepsHTML(doc.steps)}<p>`
        }
    }
    return html
}

const stepsHTML = (steps) => {
    if (steps === null) return ``
    let html = `<ul>`
    for (const step of steps) {
        html += ifElseHTML(step)
        html += stepHTML(step)
    }
    html += `</ul>`
    return html
}

const stepHTML = (step) => {
    if (step.type !== 'step') return ``
    return `
    <li>
        ${step.description}
        ${stepsHTML(step.steps)}
    </li>`
}

const ifElseHTML = (step) => {
    if (step.type !== 'if else') return ``
    return `
    <li>${step.description}
        <ul>
            <li>
                [if] ${step.if.description} 
                ${stepsHTML(step.then.steps)}
            </li>
            <li>
                [then] ${step.then.description}
                ${stepsHTML(step.then.steps)}
            </li>
            <li>
                [else] ${step.else.description}
                ${stepsHTML(step.else.steps)}
            </li>
        </ul>
    </li>`
}


function renderShelfHTML(usecases) {
    return html(usecases)
}

module.exports = renderShelfHTML