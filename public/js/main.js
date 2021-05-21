$(document).ready(() => {

    $('#btn-like').on('click', function(event) {
        event.preventDefault()
        let imgId = $(this).data('id')
        let soni = +$('.likes-count').text()

        
            $.post(`/images/${imgId}/like`)
            .done(function(data) {
                $('.likes-count').text(data.likes);
            })            
    })
    
    

    $('#btn-delete').on('click', function(event) {
        event.preventDefault();
        var $this = $(this);
        var remove = confirm('Are you sure you want to delete this image ? ');
        if (remove) {
            var imgId = $(this).data('id');
            $.ajax({
                url: '/images/' + imgId,
                type: 'DELETE'
            }).done(function(result) {
            if (result) {
                $this.removeClass('btn-danger').addClass('btn-success ');
                $this.find('i').removeClass('fa-trash ').addClass('fa-check ');
                $this.append('<span> Deleted!</span>');
                }
            })
        }
    })
    
    $('#comments').hide()

    $('#commentsToggle').on('click', ()=>{
        $('#comments').toggle(200)
    })
})