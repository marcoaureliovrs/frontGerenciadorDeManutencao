var equipamentos = {    

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
            location.href = 'registrar-equipamento.html';
        });

        equipamentos.carregarLaboratorios(null, $('#laboratorios'), $('#unidades'), 0);                

        $("#form-busca").submit(function(e){
            e.preventDefault();
            
            if($('#laboratorios').val() == 2){
                $('#resultado-busca').show();
                equipamentos.obterEquipamentosUnidade();
            } else {
                $('#resultado-busca').hide();
            }
        })
    },
    initRegistrar: function(){
        $('#btn-cancelar, #btn-regitrar-submit').on('click', function(e){
            location.href = 'equipamentos.html';
        });        
        
        equipamentos.carregarLaboratorios($("#md-full-width"), $('#md-laboratorio'),$('#md-unidades'), 0);        
        equipamentos.obterFornecedores($("#md-full-width"), $('#md-fornecedores'), $('#md-equipamentos'), 0);        

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
            equipamentos.obterUnidades(parentModal, $(this), comboUnidade, isModal);
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
            equipamentos.obterEquipamentos(parentModal, $(this), comboEquip, isModal);
        });
    },
    obterEquipamentos: function(parentModal, fornecedor, combo, isModal){
        var equipamentos;
        console.log('fornecedor: ',  fornecedor.val())
        if(fornecedor.val() == 1){
            equipamentos = [
                {id: 0, text: '-'}
                ,{id: 1, text: 'Multix Fusion Max'}                        
            ]					                
        } else {
            equipamentos = [
                {id: 0, text: '-'}
                ,{id: 3, text: 'Revolution CT'}
                ,{id: 4, text: 'Signa Explorer'}            
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
    obterEquipamentosUnidade: function(){
        var manutencao = [
            [    
                'Siemens',                            
                 '767675',
                 'Radiografia convencional (Raio-x)',                                  
                '<span class="label label-success">Em Funcionamento</span>',
                '<button>Detalhes</button>'
            ],
            [    
                'Siemens',                            
                 '123456',
                 'Radiografia convencional (Raio-x)',                                  
                '<span class="label label-danger">Em Manutenção</span>',
                '<button>Detalhes</button>'
            ],
            [    
                'Siemens',                            
                 '234356',
                 'Radiografia convencional (Raio-x)',                                  
                '<span class="label label-warning">Manutenção próxima</span>',
                '<button>Detalhes</button>'
            ]
        ];
                        
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
                        
            $('#btn-modal').click();
            
        } );
    },
    obterManutencoes: function(){
        var manutencao = [
            [                
                "1234",
                 "XPTO",                
                 "3334444555",
                 "33-Radiografia convencional (Raio-x) ",                 
                 "2016-12-04T16:00:00Z",
                 "2016-12-05T16:00:00Z",                
                "Preventiva",
                "<button>Detalhes</button>"
            ]
        ];
                        
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
    }
}