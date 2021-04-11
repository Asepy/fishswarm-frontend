export default function dateInverter(birthdate)
    {
        var edate = birthdate; //03-11-2014
        var myDate = new Date(edate);
        console.log(myDate);
        var d = myDate.getDate();
        var m =  myDate.getMonth();
        m += 1;  
        var y = myDate.getFullYear();
        var newdate=(y+ "-" + m + "-" + d);
        return(newdate);
        //alert (""+newdate); It's display "NaN-NaN-NaN"
    }