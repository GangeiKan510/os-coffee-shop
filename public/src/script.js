function filterCards() {

    let keyword = document.getElementById('filterInput').value.toLowerCase();
  
    let cards = document.getElementsByClassName('card');

    let row = document.getElementById('row');

    let filtered = ""

    for(var i = 0; i < cards.length; i++) {
      
        if(cards[i].innerText.toLowerCase().includes(keyword.toLowerCase())) {
          let template = `<div class="mx-auto card inline" style="width: 18rem;">${cards[i].innerHTML}</div>`

          console.log(template);

          filtered += template;
        }
    }

    row.innerHTML = filtered;
}