class Table{
    constructor(rows=5, columns=5, id='base', caption=undefined){
        this._rows=rows;
        this._columns=columns;
        
        this.table=document.createElement('table');
        if(caption) table.createCaption().append(caption);
        for(let r=0; r<rows; ++r){
            let row=document.createElement('tr');
            this.table.append(row);
            for(let c=0; c<columns; ++c){
                let cell=document.createElement('td');
                this.table.lastElementChild.append(cell);
            }
        }
    }
    get rows(){
        return this._rows;
    }
    get columns(){
        return this._columns;
    }

    async print(position="left: 32em; top: 12em;"){
        [this.table.style.left, this.table.style.top]=position.split('; ');
        this.table.style.left+=';';

        document.body.append(this.table);

        return await new Promise(resolve=>{
            setTimeout(() => resolve({table: this.table, rows: this.rows, columns: this.columns}), 0);
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
/*let test=new Table(5, 5, 'base');

test.print("left: 20em; top: 32em;").then(result=>Table.populateByRandom(result.table, result.rows, result.columns));*/