<script>
    import scannedNotes from '$lib/pages/woodworking/bookshelf-lamp/images/scanned-notes.png';
    import firstSketch from '$lib/pages/woodworking/bookshelf-lamp/images/first-sketch.png';
    import right from '$lib/pages/woodworking/bookshelf-lamp/images/P1172285.jpg'
    import front from '$lib/pages/woodworking/bookshelf-lamp/images/FRONT-MERGE.jpg'
    import books from '$lib/pages/woodworking/bookshelf-lamp/images/P1172235.jpg'
    import bookEdge from '$lib/pages/woodworking/bookshelf-lamp/images/P1172247.jpg'
    import corner from '$lib/pages/woodworking/bookshelf-lamp/images/P1172315.jpg'
    import glassCorner from '$lib/pages/woodworking/bookshelf-lamp/images/P1172316.jpg'
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
    img {
        width: 100%;
    }
</style>