function get_date(data)
{
    date = new Date(data);
    year = date.getFullYear();
    month = date.getMonth()+1;
    dt = date.getDate();
    if (dt < 10) 
    {
        dt = '0' + dt;
    }
    if (month < 10) 
    {
        month = '0' + month; 
    }
    return (dt+'/'+month+'/'+year);
}
function get_date2(data)
{
    date = new Date(data);
    year = date.getFullYear();
    month = date.getMonth()+1;
    dt = date.getDate();
    if (dt < 10) 
    {
        dt = '0' + dt;
    }
    if (month < 10) 
    {
        month = '0' + month; 
    }
    return (year+'-'+month+'-'+dt);
}
function remover_item(id)
{
    document.location.href = './excluir/'+id;
}
function filtrar()
{
    var tipo = document.getElementById("filtro").value;
    var data = document.getElementById("date").value;
    var cliente = document.getElementById("cliente").value;
    if(document.getElementById("filtro").value == 0)
    {
        alert("Escolha um filtro!");
    }
    else if((tipo == 2 && cliente == 0) || (tipo == 1 && data == null))
    {
        alert("Preencha adequadamente os filtros!");
    }
    else
    {
        $.post( "impressao/filtro", 
        {
            tipo: tipo, 
            data: data, 
            cliente: cliente
        }, function(data) 
        {
            var tabela = document.getElementById("table");
            while(tabela.children[1]) 
            {
                tabela.removeChild(tabela.children[1]);
            }
            data.forEach(row => 
            {
                var row_table = document.createElement("tr");
                row_table.id = "row"+document.getElementById("date").value;
                var data = document.createElement("td");
                var cliente = document.createElement("td");
                var qtd = document.createElement("td");
                var preco = document.createElement("td");
                var excluir = document.createElement("td");
                var imprimir = document.createElement("td");
                data.innerHTML = get_date(row.data);
                cliente.innerHTML = row.nome;
                qtd.innerHTML = row.total_itens;
                preco.innerHTML = transform_to_preco(row.valor_total);
                excluir.innerHTML = "Excluir";
                excluir.className = "remove";
                excluir.onclick = function ()
                {
                    remover_item(row.id_orcamento);
                };
                imprimir.innerHTML = "Imprimir";
                imprimir.className = "remove"
                imprimir.onclick = function () 
                {
                    document.location.href = './impressao/pdf/'+row.id_orcamento;
                };
                row_table.appendChild(data);
                row_table.appendChild(cliente);
                row_table.appendChild(qtd);
                row_table.appendChild(preco);
                row_table.appendChild(excluir);
                row_table.appendChild(imprimir);
                table.appendChild(row_table);
            });
        });
    }
}
function troca_filtro()
{
    if(document.getElementById("filtro").value == 1)
    {
        document.getElementById("date").className = "input1 teste2";
        document.getElementById("cliente").className = "input1 teste";
    }
    else if(document.getElementById("filtro").value == 2)
    {
        document.getElementById("cliente").className = "input1 teste2";
        document.getElementById("date").className = "input1 teste";
    }
}
function transform_to_preco(preco)
{
    var strPreco = "R$ " + parseFloat(preco).toFixed(2).toString().replace(".", ",");
    // retornando o resultado
    return strPreco;
}