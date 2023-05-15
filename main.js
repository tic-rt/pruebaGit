
document.getElementById('next').onclick = function(){
    const widthItem = document.querySelector('.card').offsetWidth;
    document.getElementById('formList').scrollLeft += widthItem;
  }
  document.getElementById('prev').onclick = function(){
    const widthItem = document.querySelector('.card').offsetWidth;
    document.getElementById('formList').scrollLeft -= widthItem;
  }
  