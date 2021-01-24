let autocomplete;
function initAutocomplete() {
    autocomplete = new google.maps.places.Autocomplete(
        document.getElementById('autocomplete'),
        {
            types: ['establishment'],
            componentRestrictions: {'country': ['AU']},
            fields: ['place_id', 'geometry', 'name']
        });
}