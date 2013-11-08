function fillDaySelect(){
    $.ajax({
        url: "../../Model/getDays.php",
        dataType: "json",
        success: function( json ){
            for( i in json ){
                var dayName = document.createTextNode( json[i].nombreDia );
                var option = document.createElement( "option" );
                option.id = "day-option-" + json[i].idDia.toString();
                option.value = json[i].idDia;
                option.appendChild( dayName );
                document.getElementById( "new-class-day0" ).appendChild( option );
            }
        }
    });
}

function fillAcademySelect(){
    $.ajax({
        url: "../../Model/getAcademies.php",
        dataType: "json",
        success: function( json ){
            for( i in json ){
                var academyName = document.createTextNode( json[i].nombreAcademia );
                var option = document.createElement( "option" );
                option.id = "academy-option-" + json[i].idAcademia.toString();
                option.value = json[i].idAcademia;
                option.appendChild( academyName );
                document.getElementById( "new-class-academy" ).appendChild( option );
            }
        }
    });
}

function fillClassSelect(){
    $.ajax({
        url: "../../Model/getClasses.php",
        dataType: "json",
        success: function( json ){
            for( i in json ){
                var className = document.createTextNode( json[i].clave + " " + json[i].nombre );
                var option = document.createElement( "option" );
                option.id = "class-key-option-" + json[i].idCurso.toString();
                option.value = json[i].idCurso;
                option.appendChild( className );
                document.getElementById( "new-class-key" ).appendChild( option );
            }
        }
    });
}

function fillMajorSelect( selectId ){
    $.ajax({
        url: "../../Model/getMajors.php",
        dataType: "json",
        success: function( json ){
            for( i in json ){
                var majorName = document.createTextNode( json[i].nombreCarrera );
                var option = document.createElement( "option" );
                option.id = "student-major-option-" + json[i].idCarrera.toString();
                option.value = json[i].idCarrera;
                option.appendChild( majorName );
                document.getElementById( selectId ).appendChild( option );
            }
        }
    });
}

function fillTeacherClassSelect( selectId ){
    $.ajax({
        url: "../../Model/getTClasses.php",
        dataType: "json",
        success: function( json ){
            var count = 1;
            for( i in json ){
                var secString = ( json[i].seccion.length == 1 )? "0" + json[i].seccion : json[i].seccion;
                var classInfo = document.createTextNode( json[i].clave + " D" + secString + " " + json[i].ciclo );
                var option = document.createElement( "option" );
                option.id = "teacher-class-option-" + count.toString();
                option.value = json[i].clave + "-" + json[i].seccion + "-" + json[i].ciclo;
                option.appendChild( classInfo );
                document.getElementById( selectId ).appendChild( option );
                count += 1;
            }
        }
    });
}

function getStudentData(){
    var code = document.getElementById( "reg-student-code" ).value;
    var checkbox;
    
    $.ajax({
        type: "POST",
        data: {studentCode: code},
        url: "../../Model/getStudentData.php",
        dataType: "json",
        success: function( json ){
            if( json != null ){
                document.getElementById( "reg-student-name" ).value = json.nombre;
                document.getElementById( "reg-student-last1" ).value = json.apellidoP;
                document.getElementById( "reg-student-last2" ).value = json.apellidoM;
                document.getElementById( "reg-student-email" ).value = json.email;
                document.getElementById( "reg-student-major" ).value = json.idCarrera;
                if( json.celular != null ){
                    checkbox = document.getElementById( "checkbox-tel" );
                    checkbox.checked = true;
                    checkbox.onclick();
                    document.getElementById( "reg-student-phone" ).value = json.celular;
                }
                if( json.paginaWeb != null ){
                    checkbox = document.getElementById( "checkbox-url" );
                    checkbox.checked = true;
                    checkbox.onclick();
                    document.getElementById( "reg-student-url" ).value = json.paginaWeb;
                }
                if( json.github != null ){
                    checkbox = document.getElementById( "checkbox-github" );
                    checkbox.checked = true;
                    checkbox.onclick();
                    document.getElementById( "reg-student-github" ).value = json.github;
                }
            }
            else{
                alert( "No se encontro el alumno." );
            }
        }
    });
}
