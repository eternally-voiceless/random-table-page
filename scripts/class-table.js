class Table{
    constructor(rows=5, columns=5, caption=undefined){
        this._rows=rows;
        this._columns=columns;
        
        let table=document.createElement('table');
        if(caption) table.createCaption().append(caption);
        for(let r=0; r<this.rows; ++r){
            let row=document.createElement('tr');
            table.append(row);
            for(let c=0; c<this.columns; ++c){
                let cell=document.createElement('td');
                table.lastElementChild.append(cell);
            }
        }
        table.id='table';

        this.table=table;
    }
    get rows(){
        return this._rows;
    }
    get columns(){
        return this._columns;
    }

    #chooseRandomCell(){
        let rowIndex=Math.floor(this.rows*Math.random());
        let colIndex=Math.floor(this.columns*Math.random());
        this.table.rows[rowIndex].cells[colIndex].style.color='red';
    }

    async print(positionLeft, positionTop){
        this.#chooseRandomCell();

        let table=this.table;
        table.style.position='absolute';
        table.style.left=positionLeft;
        table.style.top=positionTop;
        table.className='for_table';
        document.body.append(table);

        return await new Promise(resolve=>{    
            setTimeout(() => {
                table.style.opacity='1';
                resolve({table: this.table, rows: this.rows, columns: this.columns});
            }, 0);
        });
    }

    static populateByRandom(Table, Rows, Columns){
        for(let r=0; r<Rows; ++r){
            for(let c=0; c<Columns; ++c){
                let current=Math.floor(100*Math.random());
                if(0<=current && current<10) current='0'+current;
                Table.rows[r].cells[c].append(current);
            }
        }
    }
}

//Here's a simple testing below
//let test=new Table(15, 25);

//test.print("35em", "18em").then(result=>Table.populateByRandom(result.table, result.rows, result.columns));

function createInstance(rows, columns, x_coordinate, y_coordinate){
    let table=new Table(rows, columns);
    table.print(x_coordinate, y_coordinate).then(output=>{
        Table.populateByRandom(output.table, output.rows, output.columns);
        console.log('Table created!');
    })

}

function createTable(){
    if(!document.getElementById('table')){
        createInstance(20, 32, '17.5em', '13em');
        document.getElementById('create-table').id='refresh-table';
        document.getElementById('refresh-table').innerText='Refresh Table';
    }
    else if(document.getElementById('refresh-table')){
        deleteTable();
        createTable();
    }
}

function deleteTable(){
    if(document.getElementById('table')) {
        document.getElementById('table').remove();
        console.log('Table removed!');
    }
    
    if(document.getElementById('refresh-table')){
        document.getElementById('refresh-table').id='create-table';
        document.getElementById('create-table').innerText='Create Table';
    }
}

