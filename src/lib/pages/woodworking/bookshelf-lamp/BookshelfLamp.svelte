<script>
    import scannedNotes from '$lib/pages/woodworking/bookshelf-lamp/images/scanned-notes.png?enhanced';
    import firstSketch from '$lib/pages/woodworking/bookshelf-lamp/images/first-sketch.png?enhanced';
    import right from '$lib/pages/woodworking/bookshelf-lamp/images/P1172285.jpg?enhanced'
    import front from '$lib/pages/woodworking/bookshelf-lamp/images/FRONT-MERGE.jpg?enhanced'
    import books from '$lib/pages/woodworking/bookshelf-lamp/images/P1172235.jpg?enhanced'
    import bookEdge from '$lib/pages/woodworking/bookshelf-lamp/images/P1172247.jpg?enhanced'
    import corner from '$lib/pages/woodworking/bookshelf-lamp/images/P1172315.jpg?enhanced'
    import glassCorner from '$lib/pages/woodworking/bookshelf-lamp/images/P1172316.jpg?enhanced'
    import Project from '../Project.svelte';
</script>

<Project name={"Bookshelf Lamp"} date={"January 2026"} description={"Walnut and stained glass"} thumbnail={right}>

    <enhanced:img src={front} alt="Bookshelf lamp from the front" />
    <enhanced:img src={books} alt="Books on the bookshelf lamp" />
    <enhanced:img src={bookEdge} alt="Zoom in on the edge of the bookshelf lamp" />
    <enhanced:img src={corner} alt="A corner of the bookshelf lamp" />
    <enhanced:img src={glassCorner} alt="A corner of the bookshelf lamp" />
    
    My first sketch of the bookshelf lamp
    <enhanced:img src={firstSketch} alt="First sketch" />

    Some later sketches
    <enhanced:img src={scannedNotes} alt="Some initial sketches" />

</Project>


<style>
    :global(picture img) {
        width: 100%;
        max-width: 100%;
        height: auto;
        display: block;
    }
</style>