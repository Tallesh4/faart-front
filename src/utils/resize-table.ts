export function ResizeTable(index: number) {
    const heightTr1 = <number> document.getElementById('table_primary_' + index)?.offsetHeight;
    const heightTr2 = <number> document.getElementById('table_secondary_' + index)?.offsetHeight;

    if (heightTr1 > heightTr2) {
      const tableTwo = document.getElementById('table_secondary_' + index);

      if(tableTwo){
        tableTwo.style.height = heightTr1 + 'px';
      }
    } else {
      const tableOne = document.getElementById('table_primary_' + index);

      if(tableOne){
        tableOne.style.height = heightTr2 + 'px';
      }
    } 
  }