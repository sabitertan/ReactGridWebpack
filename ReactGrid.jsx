import * as React from 'react';
import { EditingState } from '@devexpress/dx-react-grid';
import {
    Grid,
    Table,
    TableHeaderRow,
    TableEditRow,
    TableEditColumn,
} from '@devexpress/dx-react-grid-bootstrap4';

const getRowId = row => row.id;

export default class ReactGrid extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            columns: [
                { name: 'name', title: 'Name' },
                { name: 'sex', title: 'Sex' },
                { name: 'city', title: 'City' },
                { name: 'car', title: 'Car' },
            ],
            rows: [
                { sex: "Female", name: "Sandra", city: "Las Vegas", car: "Audi A4" },
                { sex: "Male", name: "Paul", city: "Paris", car: "Nissan Altima" },
                { sex: "Male", name: "Mark", city: "Paris", car: "Honda Accord" },
                { sex: "Male", name: "Paul", city: "Paris", car: "Nissan Altima" },
                { sex: "Female", name: "Linda", city: "Austin", car: "Toyota Corolla" },
                {
                  sex: "Male",
                  name: "Robert",
                  city: "Las Vegas",
                  car: "Chevrolet Cruze"
                },
                { sex: "Female", name: "Lisa", city: "London", car: "BMW 750" },
                { sex: "Male", name: "Mark", city: "Chicago", car: "Toyota Corolla" },
                {
                  sex: "Male",
                  name: "Thomas",
                  city: "Rio de Janeiro",
                  car: "Honda Accord"
                },
                { sex: "Male", name: "Robert", city: "Las Vegas", car: "Honda Civic" },
                { sex: "Female", name: "Betty", city: "Paris", car: "Honda Civic" },
                {
                  sex: "Male",
                  name: "Robert",
                  city: "Los Angeles",
                  car: "Honda Accord"
                },
                {
                  sex: "Male",
                  name: "William",
                  city: "Los Angeles",
                  car: "Honda Civic"
                },
                { sex: "Male", name: "Mark", city: "Austin", car: "Nissan Altima" }
              ],
        };

        this.commitChanges = this.commitChanges.bind(this);
    }

    commitChanges({ added, changed, deleted }) {
        let { rows } = this.state;
        if (added) {
            const startingAddedId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
            rows = [
                ...rows,
                ...added.map((row, index) => ({
                    id: startingAddedId + index,
                    ...row,
                })),
            ];
        }
        if (changed) {
            rows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
        }
        if (deleted) {
            const deletedSet = new Set(deleted);
            rows = rows.filter(row => !deletedSet.has(row.id));
        }
        this.setState({ rows });
    }

    render() {
        const { rows, columns } = this.state;

        return (
            <div className="card">
                <Grid
                    rows={rows}
                    columns={columns}
                    getRowId={getRowId}
                >
                    <EditingState
                        onCommitChanges={this.commitChanges}
                    />
                    <Table />
                    <TableHeaderRow />
                    <TableEditRow />
                    <TableEditColumn
                        showAddCommand
                        showEditCommand
                        showDeleteCommand
                    />
                </Grid>
            </div>
        );
    }
}

ReactDOM.render(<ReactGrid />, document.getElementById('ReactGrid'));