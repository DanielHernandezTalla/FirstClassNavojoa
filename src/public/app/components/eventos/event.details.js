'use strict';
import eventAdd from './eventos.forms.js';
import modalError from '../modal.error.js';
import {GetTxtMonth} from './calendar.js';

export default async function sectionDetailsEvent(id){

    let data = await getById(id);
    data = data[0];
    console.log(data);
    let pagos= await getPagosById(id);
    console.log(pagos);

    const $main = document.createElement('main');
    const $divContainer = document.createElement('div');
    $divContainer.classList.add('container');

    const $h2 = document.createElement('h2');
    $h2.innerHTML='DETALLES EVENTO';
    $h2.classList.add('h2');
    $divContainer.appendChild($h2);

    const $event_details_head = document.createElement('div');
    $event_details_head.classList.add('details_head');

    const $btn_printAll = document.createElement('button');
    $btn_printAll.innerHTML = 'Imprimir completo';
    $btn_printAll.classList.add('btn_add-event')

    const $btn_printDetails = document.createElement('button');
    $btn_printDetails.innerHTML = 'Imprimir Detalles';
    $btn_printDetails.classList.add('btn_add-event')

    $event_details_head.appendChild($btn_printAll);
    $event_details_head.appendChild($btn_printDetails);
    $divContainer.appendChild($event_details_head);

    const $detailSection = document.createElement('section');
    $detailSection.classList.add('details_section');

    const $tipoEvento = document.createElement('h3');
    $tipoEvento.innerHTML = `${data.TipoEvento}`;
    $tipoEvento.classList.add('typeEvent');
    $detailSection.appendChild($tipoEvento);

    const $details1 = document.createElement('div');
    $details1.classList.add('details');

    /*Dando formato a los campos*/
    let fechaEvento = new Date(data.FechaEvento);
    fechaEvento = fechaEvento.getDate()+" de "+await GetTxtMonth(fechaEvento.getMonth()+1)+" de "+fechaEvento.getFullYear();
   
    let sesion = new Date(data.Sesion);
    sesion = sesion.getDate()+" de "+await GetTxtMonth(sesion.getMonth()+1)
    +" de "+sesion.getFullYear()+" a las "+sesion.getHours()+":"+sesion.getMinutes();
    
    let hora = data.HoraInicio.substring(0,5);
    let horacena = data.HoraCena.substring(0,5);
    /*Fin de los formatos*/

    $details1.innerHTML =`
    <label class="lbldetail" >Fecha</label>
    <p class="eventdata">${fechaEvento}</p>
    <label class="lbldetail" >Ubicacion</label>
    <p class="eventdata">${data.Ubicacion}</p>
    <label class="lbldetail" >Cliente</label>
    <p class="eventdata">${data.Cliente}</p>
    <label class="lbldetail" >Telefono</label>
    <p class="eventdata">${data.Telefono}</p>
    <label class="lbldetail" >Hora</label>
    <p class="eventdata">${hora}</p>
    <label class="lbldetail" >Platillo</label>
    <p class="eventdata">${data.Platillo}</p>
    <label class="lbldetail" >NoPersonas</label>
    <p class="eventdata">${data.NoPersonas}</p>
    <label class="lbldetail" >Tipo de mesa</label>
    <p class="eventdata">${data.TipoMesa}</p>
    <label class="lbldetail" >Mantel</label>
    <p class="eventdata">${data.Mantel}</p>
    `
    const $details2 = document.createElement('div');
    $details2.classList.add('details');

    $details2.innerHTML =`
    <label class="lbldetail" >Sesion</label>
    <p class="eventdata">${sesion}</p>
    <label class="lbldetail" >Evento</label>
    <p class="eventdata">${data.TipoEvento}</p>
    <label class="lbldetail" >Ceremonia civil</label>
    <p class="eventdata">${data.CeremoniaCivil}</p>
    <label class="lbldetail" >Hora cena</label>
    <p class="eventdata">${horacena}</p>
    <label class="lbldetail" >Alcohol</label>
    <p class="eventdata">${data.Alcohol}</p>
    <label class="lbldetail" >NoMeseros</label>
    <p class="eventdata">${data.NoMeseros}</p>
    <label class="lbldetail" >Tipo silla</label>
    <p class="eventdata">${data.TipoSilla}</p>
    <label class="lbldetail" >Cristaleria</label>
    <p class="eventdata">${data.Cristaleria}</p>
    <label class="lbldetail" >Servilleta</label>
    <p class="eventdata">${data.Servilleta}</p>
    `
    const $croquis = document.createElement('div');
    $croquis.classList.add('croquis');
    $croquis.innerHTML=`
    <label class="lbldetail" >Croquis </label>
    <p class="eventdata">21-05-2022</p>
    <img class="img_croquis">
    `
    const $casosEspeciales = document.createElement('div');
    $casosEspeciales.classList.add('casosEspeciales');
    $casosEspeciales.innerHTML=`
    <label class="lbldetail" >Casos especiales </label>
    <p class="eventdata">${data.CasoEspecial}</p>
    `
    const $sectionTable = document.createElement('div');
    $sectionTable.classList.add('table__pagos');

    $sectionTable.innerHTML=`
        <p>No Pago</p>
        <p>Metodo de pago</p>
        <p>Fecha</p> 
        <p class="text-align-right">Cantidad</p>
    `;

    if(pagos){
        
        let sumaAbonos=0;
        pagos.forEach(item=>{
            
            let fechaPago = new Date(item.FechaPago);
            fechaPago = fechaPago.getDate()+"/"+ GetTxtMonth(fechaPago.getMonth()+1)+"/"+fechaPago.getFullYear();
   
            $sectionTable.innerHTML+=`
                <p>${item.NoAbono}</p>
                <p>${item.MetodoPago}</p>
                <p>${fechaPago}</p>
                <p class="text-align-right abono">$${item.Monto}</p>
            `
            sumaAbonos+=parseInt(item.Monto);
        })
        let adeudototal=parseInt(data.CostoTotal)-sumaAbonos;
        $sectionTable.innerHTML += `
        <p></p>
        <p></p>
        <p class="text-align-right">Abono total</p>
        <p class="text-align-right abono-total">$${sumaAbonos}</p>

        <p></p>
        <p></p>
        <p class="text-align-right">Total Evento</p>
        <p class="text-align-right">$${data.CostoTotal}</p>

        <p></p>
        <p></p>
        <p class="text-align-right">Adeudo restante</p>
        <p class="text-align-right adeudo-total">$${adeudototal}</p>

`;

    }
    


    $detailSection.appendChild($details1);
    $detailSection.appendChild($details2);
    $detailSection.appendChild($croquis);
    $detailSection.appendChild($casosEspeciales);
    $divContainer.appendChild($detailSection);
    $divContainer.appendChild($sectionTable);

    $divContainer.innerHTML += `
    <button class="btn btn-primary" type="submit">Editar</button>
    <button class="btn btn-cancel btn-cancel-home" type="submit">Cancelar</button>
`;
    $main.appendChild($divContainer);
    return $main;
}

async function getById(id)
{
    try{
        let res = await fetch('http://localhost:3000/eventos/'+ id+'/');

        if(!res.ok)
            throw (res);
        let data = await res.json();

        return data.body;

    }catch(e){
        const $root = document.getElementById("root");
        $root.appendChild(await modalError(e));
        return null;
    }
} 

async function getPagosById(id)
{
    try{
        let res = await fetch('http://localhost:3000/pagos/'+ id+'/');

        if(!res.ok)
            throw (res);
        let data = await res.json();

        return data.body;
    }catch (e) {
        const $root = document.getElementById("root");
        $root.appendChild(await modalError(e));
        return null;
    }
}