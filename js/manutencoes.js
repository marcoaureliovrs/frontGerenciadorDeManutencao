var manutencoes = {    
    init: function(){                    

        $('#btn-finalizar').on('click', function(e){
            e.preventDefault();
            $('#div-justificar').removeClass('hidden');
        });
        $('#btn-finalizar-2').on('click', function(e){
            e.preventDefault();
            $('.close').click();
        });
        
        $('#btn-nao-finalizar').on('click', function(e){
            e.preventDefault();
            $('#div-justificar').addClass('hidden');
        });

        $('#btn-registrar').on('click', function(e){
            location.href = 'registrar-manutencao.html';
        });

        manutencoes.carregarLaboratorios(null, $('#laboratorios'), $('#unidades'), 0);                

        $("#form-busca").submit(function(e){
            e.preventDefault();
            
            if($('#laboratorios').val() == 2){
                $('#resultado-busca').show();
                manutencoes.obterManutencoes();
            } else {
                $('#resultado-busca').hide();
            }
        })
    },
    initRegistrar: function(){                

        $('#btn-registrar-man').on('click', function(e){
            e.preventDefault();
            
            var dtIni = moment($('#md-dt-ini').val().split(' ')[0], 'DD/MM/YYYY').format('YYYY-MM-DD');
            var horaIni = $('#md-dt-ini').val().split(' ')[1];

            var dtFim = moment($('#md-dt-fim').val().split(' ')[0], 'DD/MM/YYYY').format('YYYY-MM-DD');
            var horaFim = $('#md-dt-fim').val().split(' ')[1];

            var codEqui =  $('#md-equipamentos').select2('data')[0]['text'].split('-')[0]
            var nomeEqui =  $('#md-equipamentos').select2('data')[0]['text'].split('-')[1]

            var params = {
                codManutencao: Math.floor(Math.random() * 1000000),
                nomeLaboratorioSolicitante: $('#md-laboratorio').select2('data')[0]['text'],
                unidadeSolicitante:  $('#md-unidades').select2('data')[0]['text'],
                enderecoLaboratorioSolicitante: 'Av. Sapopemba 4100',
                nomeFuncionarioSolicitante: 'Marco Aurélio',
                nomeFornecedor: $('#md-unidades').select2('data')[0]['text'],
                nomeTecnico: 'Diego Santos Rodrigues',
                codEquipamento: codEqui,
                nomeEquipamento: nomeEqui,
                modeloEquipamento: 'X3333',
                dataInicioManutencao: dtIni + 'T' + horaIni +  'Z',
                dataFinalManutencao: dtFim + 'T' + horaFim +  'Z',
                statusManutencao:'agendado',
                tipoManutencao: $('#md-tp-manutencao').val(),
                laudoTecnicoManutencao:''
            }            

            $.ajax({
                url: 'http://ec2-54-233-106-93.sa-east-1.compute.amazonaws.com/manutencoes/manutencao/',
                type: 'POST',
                data: params,
                success: function(retorno){
                    console.log(retorno)
                    location.href = 'manutencoes.html'
                }
            })            
        });

        $('#btn-cancelar').on('click', function(e){
            location.href = 'manutencoes.html';
        });        
        

        manutencoes.carregarLaboratorios($("#md-full-width"), $('#md-laboratorio'),$('#md-unidades'), 0);
        
        manutencoes.obterFornecedores($("#md-full-width"), $('#md-fornecedores'), $('#md-equipamentos'), 0);        

    },
    carregarLaboratorios: function(parentModal, combo, comboUnidade, isModal){
        comboUnidade.select2();
        var laboratorios = [
            {id: 0, text: '-'}
            ,{id: 1, text: 'ALTA EXCELÊNCIA DIAGNÓSTICA'}
            ,{id: 2, text: 'DELBONI AURIEMO'}
            ,{id: 3, text: 'LAVOISIER'}
            ,{id: 4, text: 'LABORATÓRIO OSWALDO CRUZ'}
            ,{id: 5, text: 'BRONSTEIN'}
            ,{id: 6, text: 'LÂMINA'}
            ,{id: 7, text: 'SÉRGIO FRANCO'}
            ,{id: 8, text: 'CDPI'}
            ,{id: 9, text: 'MULTI-IMAGEM'}
            ,{id: 10, text: 'EXAME'}
            ,{id: 11, text: 'ATALAIA'}
            ,{id: 12, text: 'CEDIC'}
            ,{id: 13, text: 'CEDILAB'}
            ,{id: 14, text: 'IMAGE MEMORIAL'}
            ,{id: 15, text: 'LABPASTEUR'}
            ,{id: 16, text: 'UNIMAGEM'}
            ,{id: 17, text: 'GILSON CIDRIM'}
            ,{id: 18, text: 'GASPAR'}
            ,{id: 19, text: 'CERPE' }
            ,{id: 20, text: 'FRISCHMANN AISENGART'}
            ,{id: 21, text: 'LÂMINA SC'}
            ,{id: 22, text: 'ALVARO' }
            ,{id: 23, text: 'CIENTÍFICA LAB'}
            ,{id: 24, text: 'PREVILAB'}
            ,{id: 25, text: 'CYTOLAB'}
        ];

        if(isModal == 1){
            combo.select2({            
                dropdownParent: parentModal,
                data: laboratorios        
            });
            
        }else{
            combo.select2({            
                data: laboratorios        
            });
        }

        combo.on('change', function (e) {                            
            manutencoes.obterUnidades(parentModal, $(this), comboUnidade, isModal);
        });
    },
    obterUnidades: function(parentModal, comboLab, comboUnidade, isModal){
        var unidades;   
        if(comboLab.val() == 2) {				
            unidades = [
                {id: 0, text: '-'}
                ,{id: 1, text: 'Alphaville'}
                ,{id: 2, text: 'Augusta'}
                ,{id: 3, text: 'Brooklin'}
                ,{id: 4, text: 'Guarulhos'}
                ,{id: 5, text: 'Lapa'}
                ,{id: 6, text: 'Mooca'}
                ,{id: 7, text: 'Osasco'}
                ,{id: 8, text: 'Santos'}
                ,{id: 9, text: 'Viaduto do Chá'}];											
        }		
        else{
            unidades = [
            {id: 0, text: '-'}]					
        }		
        comboUnidade.select2();
        comboUnidade.empty().trigger("change");
        
        if(isModal == 1){
            comboUnidade.select2({
                dropdownParent: parentModal,
                data: unidades
            });
        } else{
            comboUnidade.select2({
                data: unidades
            });
        }
    },
    obterFornecedores: function(parentModal, combo, comboEquip, isModal){
        comboEquip.select2();

        var fornecedores = [
            {id: 0, text: '-'}
            ,{id: 1, text: 'Siemens'}
            ,{id: 2, text: 'GE Health Care'}            
        ]					                
        
        combo.select2();
        combo.empty().trigger("change");

        if(isModal == 1){
            combo.select2({
                dropdownParent: parentModal,
                data: fornecedores
            });
        } else{
            combo.select2({
                data: fornecedores
            });
        }

        combo.on('change', function (e) {                            
            manutencoes.obterEquipamentos(parentModal, $(this), comboEquip, isModal);
        });
    },
    obterEquipamentos: function(parentModal, fornecedor, combo, isModal){
        var equipamentos;
        console.log('fornecedor: ',  fornecedor.val())
        if(fornecedor.val() == 1){
            equipamentos = [
                {id: 0, text: '-'}
                ,{id: 1, text: '1234 - Multix Fusion Max'}                        
            ]					                
        } else {
            equipamentos = [
                {id: 0, text: '-'}
                ,{id: 3, text: '5678 - Revolution CT'}
                ,{id: 4, text: '1122 - Signa Explorer'}            
            ]		
        }			   
        
        combo.select2();
        combo.empty().trigger("change");

        if(isModal == 1){
            combo.select2({
                dropdownParent: parentModal,
                data: equipamentos
            });
        } else{
            combo.select2({
                data: equipamentos
            });
        }
    },
    obterManutencoes: function(){
        $.ajax({
            url: 'http://ec2-54-233-106-93.sa-east-1.compute.amazonaws.com/manutencoes/', 
            success: function(manutencaoArr){            
                                
                var manutencao = []; 
                var registro = [];
                var classe;
                for(i = 0; i < manutencaoArr.length; i++) {
                    if(manutencaoArr[i].tipoManutencao != undefined){
                        if (manutencaoArr[i].tipoManutencao == 'Preventiva'){
                            classe = 'label-warning'
                        } else{
                            classe = 'label-danger'
                        }                                                

                        registro.push(manutencaoArr[i].codManutencao);
                        registro.push(manutencaoArr[i].nomeFornecedor);
                        registro.push(manutencaoArr[i].codEquipamento);
                        registro.push(manutencaoArr[i].nomeEquipamento);
                        registro.push(manutencaoArr[i].dataInicioManutencao);
                        registro.push(manutencaoArr[i].dataFinalManutencao);            
                        registro.push(                                                
                            '<span class="label ' + classe + '">' + manutencaoArr[i].tipoManutencao + '</span>'                        
                        );            
                        registro.push("<button>Detalhes</button>");                        
            
                        manutencao.push(registro);
                        registro = [];            
                    }
                }
                                                
                var table = $('#agendadas').DataTable({
                    data: manutencao,
                    defaultContent: "<button>Click!</button>",
                    language: 	
                    {
                        "sEmptyTable": "Nenhum registro encontrado",
                        "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
                        "sInfoEmpty": "Mostrando 0 até 0 de 0 registros",
                        "sInfoFiltered": "(Filtrados de _MAX_ registros)",
                        "sInfoPostFix": "",
                        "sInfoThousands": ".",
                        "sLengthMenu": "_MENU_ resultados por página",
                        "sLoadingRecords": "Carregando...",
                        "sProcessing": "Processando...",
                        "sZeroRecords": "Nenhum registro encontrado",
                        "sSearch": "Pesquisar",
                        "oPaginate": {
                            "sNext": "Próximo",
                            "sPrevious": "Anterior",
                            "sFirst": "Primeiro",
                            "sLast": "Último"
                        },
                        "oAria": {
                            "sSortAscending": ": Ordenar colunas de forma ascendente",
                            "sSortDescending": ": Ordenar colunas de forma descendente"
                        }
                    }
                });
        
                $('#agendadas tbody').on( 'click', 'button', function () {
                    var data = table.row( $(this).parents('tr') ).data();
                    $('#sp-ticket').html(data[0]);
                    $('#sp-fornecedor').html(data[1]);
                    $('#sp-cod-equ').html(data[2]);
                    $('#sp-equi').html(data[3]);            
                                
                    $('#sp-lab').html($('#laboratorios').select2('data')[0]['text']);
                    $('#sp-uni').html($('#unidades').select2('data')[0]['text']);
                                
                    $('#sp-ini-man').html(data[4]);
                    $('#sp-fim-man').html(data[5]);
                    $('#sp-tipo-man').html(data[6]);
                                
                    $('#btn-modal').click();
                    
                } );
        }});
       
    }
}