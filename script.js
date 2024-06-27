function urlCheck(content) {
    let regex = /^https?:\/\/[\w/:%#\$&\?\(\)~\.=\+\-]+$/
    return regex.test(content)
}
async function linkUpdate(value) {
    let result = document.getElementById("result")
    let origin = (new URL(value)).origin

    let links = result.querySelectorAll("link")
    for (let i = 0; i < links.length; i++) {
        console.log((new URL(links[i].href)).origin === "https://robotofficial.github.io")
        if (
        !urlCheck(links[i].href) ||
        (new URL(links[i].href)).origin === "https://robotofficial.github.io"
    ) {
        let pathname = (new URL(links[i].href)).pathname
        
        let response = await fetch(
            `https://corsproxy.io/?${encodeURIComponent(origin + pathname)}`,
            {
                method:"GET",
                headers:{}
            }
        )

        links[i].remove()

        let style = document.createElement("style")
        style.innerHTML = await response.text()
        result.querySelector("meta").appendChild(style)
    }}

    let imgs = result.querySelectorAll("img")
    for (let i = 0; i < imgs.length; i++) if (
        !urlCheck(imgs[i].src) ||
        (new URL(links[i].href)).origin === "https://robotofficial.github.io"
    ) {
        let pathname = (new URL(imgs[i].src)).pathname
        imgs[i].src = `https://corsproxy.io/?${encodeURIComponent(origin + pathname)}`
    }
}
async function scriptUpdate(value) {
    let result = document.getElementById("result")
    let origin = (new URL(value)).origin

    let scripts = result.querySelectorAll("script")
    for (let i = 0; i < scripts.length; i++) {
        let src = scripts[i].src

        if (
            !urlCheck(scripts[i].src) ||
            (new URL(links[i].href)).origin === "https://robotofficial.github.io"
        ) {
            try {
                let pathname = (new URL(scripts[i].src)).pathname
                src = `${origin}${pathname}`
                scripts[i].src = `${origin}${pathname}`
            } catch {}
        }

        let response = await fetch(
            `https://corsproxy.io/?${encodeURIComponent(src)}`,
            {
                method:"GET",
                headers:{}
            }
        )

        try {
            console.log(`https://corsproxy.io/?${encodeURIComponent(src)}`)
            let text = await response.text()
            console.log(text)
            eval(text)
        } catch (error) {
            console.log(error)
        }
    }
}
async function search() {
    document.getElementById("result").innerHTML = ""

    let value = document.getElementById("url").value

    try {
        let response = await fetch(
            `https://corsproxy.io/?${encodeURIComponent(value)}`,
            {
                method:"GET",
                headers:{}
            }
        )

        let text = await response.text()
        document.getElementById("result").innerHTML = text

        linkUpdate(value)
        scriptUpdate(value)
    } catch (error) {
//        document.getElementById("result").innerHTML = `<h1>エラー</h1>\n<h5 style="color:red;">${error}</h5>`
    }
}