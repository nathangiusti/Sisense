prism.activeDashboard.filters.update({ 'jaql':{
        'dim':'[ProductSubcategory.Name]',
        'title':'My New Filter',
        'filter':{
            'doesntContain':'Temp'
        },
        'datatype':"text" 
    }
},{'save':true, 'refresh':true})
