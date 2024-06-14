import {Main, DrawerHeader} from '../Content';




export default function MerchantPayments({open}) {
    return (
        <Main open={open}>
        <DrawerHeader />

            <div className="d-flex justify-content-center">
                <p className='fs-3'>PAYMENTS</p>
            </div>
            <div className="d-flex justify-content-center">
                <p className='text-muted'>List of all payments you received from customers</p>
            </div>
            <br />

            <div style={{ overflowX: 'auto' }}>
                <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Merchant</th>
                        <th scope="col">Payer</th>
                        <th scope="col">Method</th>
                        <th scope="col">Order Number</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Fee</th>
                        <th scope="col">Total</th>
                        <th scope="col">Currency</th>
                        <th scope="col">Status</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                        <td>@fat</td>
                        <td>@fat</td>
                        <td>@fat</td>
                        <td>@fat</td>
                        <td>@fat</td>
                        <td>@fat</td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td>Larry</td>
                        <td>the Bird</td>
                        <td>@twitter</td>
                        <td>@twitter</td>
                        <td>@twitter</td>
                        <td>@twitter</td>
                        <td>@twitter</td>
                        <td>@twitter</td>
                        <td>@twitter</td>
                    </tr>
                </tbody>
                </table>
            </div>

        </Main>
    )

};


