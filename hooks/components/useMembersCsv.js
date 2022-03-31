import { useAllCities, useRubros } from "hooks/api";
import { useState } from "react";
import { v1 as uuidv1 } from "uuid";
import { parseBirthdate } from "utils/helpers/date.helpers";
import { capitalize, parseCellphone } from "utils/helpers/string.helpers";
import { parseRuc } from "utils/helpers/ruc.helpers";
import { format } from "date-fns";

const csvMappings = {
  Nombre: { header: "Nombre", field: "name" },
  Apellido: { header: "Apellido", field: "surname" },
  "Cédula de Identidad": { header: "Cédula", field: "document" },
  "Fecha de nacimiento": { header: "Nacimiento", field: "birthdate" },
  Sexo: { header: "Sexo", field: "gender", other: true },
  Departamento: { header: "Departamento", field: "departmentId", other: true },
  Ciudad: { header: "Ciudad", field: "cityId", other: true },
  Mail: { header: "Mail", field: "email", other: true },
  Celular: { header: "Celular", field: "cellphone", other: true },
  "R.U.C": { header: "Ruc Emp.", field: "ruc", other: true },
  Rubro: { header: "Rubro", field: "rubroId", other: true },
  "Especifique el rubro": {
    header: "Especifique Rubro",
    field: "memberDefinedRubro",
    other: true
  },
  "Año de fundación": {
    header: "Socio Plus",
    field: "checkedPlus"
  },
  "Sitio web o redes sociales": {
    header: "Modo de pago",
    field: "plusPaymentMethod"
  },
  "Nivel de Estudios": {
    header: "Dirección facturación",
    field: "plusBillingAddress"
  }
};

const sqlMappings = {
  id: "id",
  startDate: "start_date",
  name: "name",
  surname: "surname",
  document: "national_id",
  birthdate: "birthdate",
  gender: "gender",
  cityId: "city_id",
  email: "mail_id",
  cellphone: "cellphone",
  ruc: "ruc",
  rubroId: "rubro_id",
  memberDefinedRubro: "member_defined_rubro",
  membershipType: "membership_type",
  plusPaymentMethod: "plus_payment_method",
  plusBillingAddress: "plus_billing_address",
  status: "status"
};

function handleProcessCSV(str, delim, cities, rubros) {
  const headers = str.slice(0, str.indexOf("\n")).split(delim);
  const rows = str.slice(str.indexOf("\n") + 1).split("\n");
  const newArray = rows.map((row) => {
    const values = row.split(delim);
    const eachObject = headers.reduce((obj, header, i) => {
      const csvMeta = csvMappings[header];
      if (!csvMeta) {
        return obj;
      }
      const processedValue = convertValue(
        csvMeta.field,
        values[i],
        cities,
        rubros
      );

      obj[csvMeta.header] = {
        value: values[i],
        field: csvMeta.field,
        [csvMeta.field]: processedValue
      };
      return obj;
    }, {});
    return eachObject;
  });
  return {
    headers: Object.values(csvMappings).map((i) => i.header),
    rows: newArray
  };
}
function convertValue(field, value, cities, rubros) {
  if (field === "rubroId") {
    const rubro = rubros.find(
      (r) => r.description.toLowerCase() === value.toLowerCase()
    );
    return rubro ? rubro.id : "";
  }
  if (field === "cityId") {
    const c = cities.find((c) => c.name.toLowerCase() === value.toLowerCase());
    return c ? c.id : cities[0].id;
  }
  if (field === "departmentId") {
    let c = cities.find(
      (c) => c.departmentName.toLowerCase() === value.toLowerCase()
    );
    if (!c && value === "capital") {
      c = cities.find((c) => c.departmentName === "Asunción");
    }
    return c ? c.deparmentId : cities[0].deparmentId;
  }
  if (field === "gender") {
    return capitalize(value);
  }

  if (field === "birthdate") {
    return parseBirthdate(value);
  }

  if (field === "cellphone") {
    return parseCellphone(value);
  }

  if (field === "ruc") {
    const parsed = parseRuc(value);
    return parsed;
  }
  return value;
}

function toType(value) {
  if (typeof value === "string") {
    return `'${value}'`;
  }
  return value;
}

export function useMembersCsv() {
  const [csvData, setCsvData] = useState();
  const { data: cities } = useAllCities();
  const { data: rubros } = useRubros();

  const processCSV = (text, delim = ",") => {
    const dataRes = handleProcessCSV(text, delim, cities, rubros);
    setCsvData(dataRes);
  };

  const getRowValuesToSubmit = (row) => {
    return Object.values(row).reduce((acc, values) => {
      const { field } = values;
      acc[field] = values[field];
      return acc;
    }, {});
  };

  const generateSingleSql = (row) => {
    const values = getRowValuesToSubmit(row);
    // do some checking for required values
    if (!values.ruc) {
      values.ruc = values.document;
    }
    values.status = "PENDING";
    values.membershipType = "BASICO";

    if (values.checkedPlus === "SI") {
      values.membershipType = "PLUS_PENDIENTE";
    } else {
      values.plusBillingAddress = "";
      values.plusPaymentMethod = "";
    }
    values.id = uuidv1();
    const todayStr = format(new Date(), "yyyy-MM-dd HH:mm:ss");
    values.startDate = todayStr;

    const cols = Object.values(sqlMappings).join(",");
    const insertValues = Object.keys(sqlMappings)
      .map((key) => toType(values[key]))
      .join(",");

    const sql = `insert into members.members (${cols}) VALUES(${insertValues}) ON DUPLICATE KEY UPDATE members.start_date = ${toType(
      todayStr
    )};`;
    return sql;
  };

  const generateAllSql = (rows) => {
    return rows.map((row) => generateSingleSql(row)).join("\n");
  };
  return {
    processCSV,
    csvData,
    getRowValuesToSubmit,
    generateSingleSql,
    generateAllSql
  };
}
