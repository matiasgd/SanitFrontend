import { useRef, useState, useEffect } from "react";
import { SearchOutlined } from "@ant-design/icons";
import type { InputRef } from "antd";
import { Button, Input, Space, Table } from "antd";
import type { ColumnType, ColumnsType } from "antd/es/table";
import type { FilterConfirmProps } from "antd/es/table/interface";
//import { Highlighter } from 'react-highlight-words';
import Sidebar from "../Me/Sidebar";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import axios from "axios";
import { Link } from "react-router-dom";

interface DataType {
  _id: string;
  key: string;
  name: string;
  lastName: string;
  govermentId: string;
  gender: string;
  email: string;
  age: number;
  cellphone: string;
  nationality: string;
  healthInsurance: string;
  healthInsuranceNumber: string;
  privateHealthInsurance: string;
  privateHealthInsuranceNumber: string;
}

const Patients: React.FC = () => {
  //const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [patients, setPatients] = useState<DataType[]>([]);
  const searchInput = useRef<InputRef>(null);
  let user = useSelector((state: RootState) => state.user);
  const doctorId = user.id;

  type DataIndex = keyof DataType;

  // Transformar la respuesta de la API en el formato necesario
  const transformedData: DataType[] = patients.map((patient) => ({
    _id: patient._id,
    key: patient._id,
    name: patient.name,
    lastName: patient.lastName,
    govermentId: patient.govermentId,
    gender: patient.gender,
    email: patient.email,
    age: patient.age,
    cellphone: patient.cellphone,
    nationality: patient.nationality,
    healthInsurance: patient.healthInsurance,
    healthInsuranceNumber: patient.healthInsuranceNumber,
    privateHealthInsurance: patient.privateHealthInsurance,
    privateHealthInsuranceNumber: patient.privateHealthInsuranceNumber,
  }));

  const fetchPatientsData = async () => {
    await axios
      .get(`http://localhost:3001/api/users/${doctorId}/patients`)
      .then((res) => {
        setPatients(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchPatientsData();
  }, [doctorId]);

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): ColumnType<DataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex
        ? ""
        : // <Highlighter
          //   highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          //   searchWords={[searchText]}
          //   autoEscape
          //   textToHighlight={text ? text.toString() : ""}
          // />
          text,
  });

  const columns: ColumnsType<DataType> = [
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
      width: "30%",
      ...getColumnSearchProps("name"),
      render: (text, record) => (
        <Link to={`/patient/${record.key}`}>
          <span>{text}</span>
        </Link>
      ),
    },
    {
      title: "Apellido",
      dataIndex: "lastName",
      key: "lastName",
      width: "30%",
      ...getColumnSearchProps("name"),
      render: (text, record) => (
        <Link to={`/patient/${record.key}`}>
          <span>{text}</span>
        </Link>
      ),
    },
    {
      title: "DNI",
      dataIndex: "govermentId",
      key: "govermentId",
      width: "30%",
      ...getColumnSearchProps("govermentId"),
    },
    {
      title: "Genero",
      dataIndex: "gender",
      key: "gender",
      width: "30%",
      ...getColumnSearchProps("gender"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "30%",
      ...getColumnSearchProps("email"),
    },
    {
      title: "Edad",
      dataIndex: "age",
      key: "age",
      width: "20%",
      ...getColumnSearchProps("age"),
    },
    {
      title: "Nacionalidad",
      dataIndex: "nationality",
      key: "nationality",
      width: "20%",
      ...getColumnSearchProps("nationality"),
    },
    {
      title: "Celular",
      dataIndex: "cellphone",
      key: "cellphone",
      width: "20%",
      ...getColumnSearchProps("cellphone"),
    },
    {
      title: "Obra social",
      dataIndex: "healthInsurance",
      key: "healthInsurance",
      width: "30%",
      ...getColumnSearchProps("healthInsurance"),
    },
    {
      title: "# Numero",
      dataIndex: "healthInsuranceNumber",
      key: "healthInsuranceNumber",
      width: "30%",
      ...getColumnSearchProps("healthInsuranceNumber"),
    },
    {
      title: "Prepaga",
      dataIndex: "privateHealthInsurance",
      key: "privateHealthInsurance",
      width: "30%",
      ...getColumnSearchProps("privateHealthInsurance"),
    },
    {
      title: "# Numero",
      dataIndex: "privateHealthInsuranceNumber",
      key: "privateHealthInsuranceNumber",
      width: "30%",
      ...getColumnSearchProps("privateHealthInsuranceNumber"),
    },
  ];

  return (
    <div className="flex w-full p-4">
      <div>
        <Sidebar />
      </div>
      <div className="w-full px-4">
        <Table columns={columns} dataSource={transformedData} />
      </div>
    </div>
  );
};

export default Patients;
