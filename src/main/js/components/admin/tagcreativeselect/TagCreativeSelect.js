import React from 'react'
import CreatableSelect from 'react-select'

const createOption = (label) => ({
    label: label.toLowerCase().replace(/\W/g, ''),
    value: label.toLowerCase().replace(/\W/g, ''),
});

class TagCreativeSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            options: ["one", "two"],
            loading: false,
            value: []
        };

        this.handleChange = (option, actionMeta) => {
            console.group('Value Changed');
            console.log(option);
            console.log(`action: ${actionMeta.action}`);
            console.groupEnd();
            this.setState({value: [...this.state.value, option]});
        };

        this.handleCreate = (inputValue) => {
            this.setState({isLoading: true});
            console.group('Option created');
            console.log('Wait a moment...');
            setTimeout(() => {
                const {options} = this.state;
                const newOption = createOption(inputValue);
                console.log(newOption);
                console.groupEnd();
                this.setState({
                    isLoading: false,
                    options: [...options, newOption],
                    value: [...this.state.value, newOption],
                });
            }, 1000)
        }
    }

    render() {
        const {isLoading, options, value} = this.state;
        console.log(value);
        return (
            <CreatableSelect
                isMulti={true}
                isClearable
                isDisabled={isLoading}
                isLoading={isLoading}
                onChange={this.handleChange}
                onCreateOption={this.handleCreate}
                options={options}
                value={value}
            />
        );
    }
}