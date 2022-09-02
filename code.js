/*Declare and initialize values*/
let board = document.getElementById("board"); 
let player=1,hayGanador=false,sP=1,nm=0;
let mat=[[-1,-1,-1],[-1,-1,-1],[-1,-1,-1]]; /*Matrix where 1=user 0=computer*/
let seccion = document.getElementById("selection");
let startP=document.getElementById("switch-label");
let res=document.getElementById("result");
startP.addEventListener("click",function(){inicio()});
/*Function that is called when the user-computer switch is clicked*/
function inicio(){
    sP=(sP+1)%2;
    if(sP==0){
        player=0;
    }
    else{
        player=1;
    }
    reiniciar();
}
/*Function to generate board*/
function generateBoard(){
    let botonReinicio=document.createElement("input");
    botonReinicio.type="button";
    botonReinicio.value="Reiniciar Partida";
    botonReinicio.id="reinicio";
    botonReinicio.addEventListener("click",function(){reiniciar()});
    seccion.appendChild(botonReinicio);
    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
            let casilla = document.createElement("input");
            casilla.type="button";
            casilla.id=i.toString() + j.toString();
            casilla.addEventListener("click", function(){marcar(i,j)});
            board.appendChild(casilla);
        }
    }
}

/*Function to put an X or O into a field*/
function marcar(i,j){
    if(hayGanador) return;
    if(mat[i][j]!=-1) return;
    nm+=1;
    let IDC=i.toString()+j.toString();
    let marcada=document.getElementById(IDC);
    marcada.value = (player==0)? "X":"O";
    mat[i][j]=player;
    if(verificar(true)){
        if(player===0){
            res.innerHTML="Computer Wins";
        }else{
            res.innerHTML="User Wins";
        }
        hayGanador=true;
    }else if(nm==9){
        res.innerHTML="Tie";
    }
    player=(player+1)%2;
    if(player==0) moveComp(0,nm);
}

/*Function to restart the game*/
function reiniciar(){
    player=1;
    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
            mat[i][j]=-1;
        }
    }
    hayGanador=false;
    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
            let IDC=i.toString()+j.toString();
            let boton=document.getElementById(IDC);
            boton.value=" ";
            boton.style.backgroundColor='';
        }
    }
    nm=0;
    if(sP==0){
        player=0;
        moveComp(0,0);
    }
    res.innerHTML="";
}

/*Function to color a box to show someone won*/
function pintar(a,b){
    let boton_p = document.getElementById(a.toString()+b.toString());
    boton_p.style.backgroundColor="yellow";
}

/*Function to verify if someone won*/
function verificar(win=false){
    for(let i=0;i<3;i++){
        if(mat[i][0]===mat[i][1] && mat[i][0]==mat[i][2] && mat[i][0]!=-1){
            if(win){pintar(i,0);pintar(i,1);pintar(i,2);}
            return true;
        }
        if(mat[0][i]==mat[1][i] && mat[0][i]==mat[2][i] && mat[0][i]!=-1){
            if(win){ pintar(0,i);pintar(1,i);pintar(2,i);}
            return true;
        }
    }
    if(mat[0][0]==mat[1][1] && mat[0][0]==mat[2][2] && mat[0][0]!=-1){
        if(win){pintar(0,0);pintar(1,1);pintar(2,2);}
        return true;
    }
    if(mat[0][2]==mat[1][1] && mat[1][1]==mat[2][0] && mat[1][1]!=-1){
        if(win){pintar(0,2);pintar(1,1);pintar(2,0);}
        return true;
    }
    return false;

}

/*Function that implements min-max function for the computer to make a move*/
function moveComp(m,k){
    if(k==9) return 0;
    let r=[],maxr=-1,idxi,idxj;
    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
            if(mat[i][j]==-1){
                mat[i][j]=(m%2);
                if(verificar(false)){
                    let k=((m%2==0)? 1:-1);
                    r.push(k);
                    idxi=i;idxj=j;maxr=1;
                }else{
                    let n=moveComp(m+1,k+1);
                    r.push(n);
                    if(n>=maxr){
                        idxi=i;idxj=j;
                        maxr=n;
                    }
                }
                mat[i][j]=-1;
            }
        }
    }
    if(m>0) return (m%2==0)? Math.max(...r):Math.min(...r);
    marcar(idxi,idxj);
}
/*Generate the board*/
generateBoard();

