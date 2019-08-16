class Customers extends React.Component {
    state = {
      customers: [],
      searchTerm: ""
    }
    componentDidMount(){
        const custs = store.getState().customers;
        this.setState({customers: custs});
        store.subscribe(()=>{
            const custs = store.getState().customers;
            const st = store.getState().searchTerm;
            this.setState({customers: custs,searchTerm: st}); 
        })
    }
    viewCustomer(cust){
        store.dispatch({type:"CHANGE_CURRENT_CUSTOMER",value: cust});

    }
    shouldInclude(customer){
        if(!this.state.searchTerm)
          return true;
        if(customer.firstName.includes(this.state.searchTerm) ||
            customer.lastName.includes(this.state.searchTerm) ||
            customer.email.includes(this.state.searchTerm) 
        ) {
            return true;
        }
        
        return false;
    }
    render(){
            let tbody = [];
            for(let i =0; i < this.state.customers.length; i ++){
                const cust = this.state.customers[i]
                if(this.shouldInclude(cust)){
                    tbody.push(<tr key={i}>
                                <th scope="row">{cust.id}</th>
                                <td>{cust.firstName}</td>
                                <td>{cust.lastName}</td>
                                <td>{cust.email}</td>
                                <td><a href="#" onClick={
                                    ()=>{
                                        this.viewCustomer(cust);
                                    }
                                }>View</a></td>
                            </tr>);
                }
                
            }
            return (    
                <div className="page" >
                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">First</th>
                            <th scope="col">Last</th>
                            <th scope="col">Email</th>
                            <th scope="col">Actions</th>
                        </tr>
                        </thead>
                        <tbody id="search-customer-tbody">
                        {tbody}

                        </tbody>
                    </table>
                    
                </div>)
    }
}