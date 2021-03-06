import nav from './nav.js';
import login from './login.js';
import home from './home.js';
import sectionPersonal from './personal/personal.js';
import sectionPuestos from './puestos/puestos.js';
import sectionUsuarios from './usuarios/usuarios.js';
import sectionDocumentOptions from './documentos/documentos.options.js';
import sectionEventos from './eventos/calendar.js';


export default function Router() {

    const $root = document.getElementById("root");

    document.addEventListener("click", async e => {
        // -- Ruta formatos
        if (e.target.matches('#btn-home-formato') || e.target.matches('#btn-home-formato *')) {
            // console.log("formato");
            $root.innerHTML = ``;
            $root.appendChild(nav());
            let $sectionDocumentOptions = await sectionDocumentOptions();
            $root.appendChild($sectionDocumentOptions);
        }

        // -- Ruta eventos
        if (e.target.matches('#btn-home-evento') || e.target.matches('#btn-home-evento *')) {
            // console.log("evento");
            $root.innerHTML = ``;
            $root.appendChild(nav());
            let $sectionEventos = await sectionEventos();
            $root.appendChild($sectionEventos);
        }

        // -- Ruta personal
        if (e.target.matches('#btn-home-personal') || e.target.matches('#btn-home-personal *')) {
            // console.log("personal");
            $root.innerHTML = ``;
            $root.appendChild(nav());
            let $sectionPersonal = await sectionPersonal();
            $root.appendChild($sectionPersonal);
        }

        // -- Ruta puestos
        if (e.target.matches('#btn-home-puestos') || e.target.matches('#btn-home-puestos *')) {
            //console.log("puestos");
            $root.innerHTML = ``;
            $root.appendChild(nav());
            let $sectionPuestos = await sectionPuestos();
            $root.appendChild($sectionPuestos);
        }

        // -- Ruta usuario
        if (e.target.matches('#btn-home-usuario') || e.target.matches('#btn-home-usuario *')) {
            //console.log("puestos");
            $root.innerHTML = ``;
            $root.appendChild(nav());
            let $sectionUsuario = await sectionUsuarios();
            $root.appendChild($sectionUsuario);
        }
    })
}
