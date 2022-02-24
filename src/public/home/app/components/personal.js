export default function sectionPersonal() {
    const $section = document.createElement('section');

    $section.innerHTML = `
    <div class="table-container">
    <h2 class="h2">Lista de personal</h2>

    <section class="table table-personal">
        <!-- Header -->
        <div class="table__row-first table__row-personal">
            <p><b>Id</b></p>
            <p><b>Nombre</b></p>
            <p><b>Salario</b></p>
        </div>

        <div class="table__row table__row-personal">
            <p>01</p>
            <p>Brianda Raquel Campoy Esquer</p>
            <p>642-234-43-23</p>
        </div>

        <div class="table__row table__row-personal">
            <p>01</p>
            <p>Brianda Raquel Campoy Esquer</p>
            <p>642-234-43-23</p>
        </div>

        <div class="table__row table__row-personal">
            <p>01</p>
            <p>Brianda Raquel Campoy Esquer</p>
            <p>642-234-43-23</p>
        </div>

        <div class="">
            <button class="table__button"><i class="bi bi-plus-lg"></i>NUEVO</button>
        </div>
    </section>
</div>
    `;
    return $section;
}
