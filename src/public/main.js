'use strict';

document.addEventListener('DOMContentLoaded', e => {

    const $listInclude = document.querySelectorAll('[data-include]');

    // console.log($listInclude)

    // $listInclude.forEach(element => {
    //     let url = element.dataset.include;

    //     // console.log(url)

    //     fetch(url, {
    //             headers: {
    //                 "Content-type": "text/html; charset=utf-8"
    //             }
    //         })
    //         .then(response => {
    //             console.log(response);
    //             return response.json
    //         })
    //         .then(data => {
    //             console.log(data)
    //         })
    //         .catch(e => console.log(e))
    // })

    $listInclude.forEach(element => {
        let url = element.dataset.include
        const xhr = new XMLHttpRequest()

        xhr.addEventListener("readystatechange", e => {

            if (xhr.readyState != 4) return

            if (xhr.status >= 200 && xhr.status < 300) {
                element.outerHTML = xhr.responseText
            } else {
                let message = xhr.statusText ? `Error: ${xhr.status}, Message: ${xhr.statusText}` : "Ocurrio un error."

                const $h1 = document.createElement("h1")
                $h1.textContent = message

                element.outerHTML = `<h1 class="error">${message}</h1>`
            }
        })

        xhr.open("GET", url)

        xhr.setRequestHeader("Content-type", "text/html; charset= utf-8")

        xhr.send()
    })
})
