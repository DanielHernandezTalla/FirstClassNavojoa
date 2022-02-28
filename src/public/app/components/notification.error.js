export default function errorNotification(message) {
    let notification = createNotification(message)

    const $root = document.querySelector("main");

    $root.appendChild(notification);

    let $notification = document.querySelector('.notification-error');
    setTimeout(() => {
        $notification.classList.add('notification-translate');
        setTimeout(() => {
            $notification.classList.remove('notification-translate');
            setTimeout(() => {
                $root.removeChild($notification);
            }, 1500)
        }, 1500)
    }, 10)
}

function createNotification(message) {
    // -- Creamos el contenedor de los elementos HTML
    const $divContainer = document.createElement('div');
    $divContainer.classList.add('notification-error');

    $divContainer.innerHTML = `
        <i class="bi bi-check2-square"></i>
        <small><b>Error: </b> ${message}</small>
    `;

    return $divContainer;
}
