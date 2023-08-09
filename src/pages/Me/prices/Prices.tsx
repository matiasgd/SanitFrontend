import React, { useEffect, useState } from 'react';
import { Table} from 'antd';
import axios from 'axios';

interface Tarifa {
  activo: boolean;
  desde: string;
  hasta: string;
  nombre: string;
  porcentaje: number;
  tipo: string;
}

const TarifasTable: React.FC = () => {
  const [data, setData] = useState<Tarifa[]>([]);

  useEffect(() => {
    //  llamada a una API para obtener los datos de las tarifas
    axios
      .get('/api/tarifas')
      .then((response) => setData(response.data))
      .catch((error) => console.error('Error fetching tarifas:', error));
  }, []);

  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'nombre',
    },
    {
      title: 'Desde',
      dataIndex: 'desde',
    },
    {
      title: 'Hasta',
      dataIndex: 'hasta',
    },
    {
      title: 'Valor',
      dataIndex: 'valor',
    },
    {
      title: '%',
      dataIndex: '%',
    },
  ];

  return <Table style={{ width: "100%" }} dataSource={data} columns={columns} />;

};

export default TarifasTable;