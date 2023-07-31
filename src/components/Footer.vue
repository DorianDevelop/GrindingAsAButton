<template>
    <footer id="footer">
        <div class="credits">
            <h3>Créer par Dorian Faure.</h3>
        </div>
    </footer>
</template>

<script>
export default {
    name:"Footer"
}
</script>

<style>
#footer{
    display: flex;
    justify-content: center;
    align-items: center;
    border-top:1px solid rgba(0, 0, 0, 0.24);
}

.credits h3{
    font-size:0.8rem;
    color: rgba(0, 0, 0, 0.863);
}
</style>