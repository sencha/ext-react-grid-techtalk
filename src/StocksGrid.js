import React, { Component } from 'react';
import stocks from './data/stocks';
import { Grid, Column, Button, RendererCell, Container, SparkLineLine, TitleBar, Menu, MenuItem, SelectField } from '@extjs/ext-react';

Ext.require([
    'Ext.Toast',
    'Ext.grid.plugin.*',
    'Ext.exporter.*'
]);

let sectors = Array.from(new Set(stocks.map(stock => stock.sector))).map(sector => {
    return { text: sector, value: sector }
})

export default class StocksGrid extends Component {
    
    constructor() {
        super();

        this.store = new Ext.data.Store({
            data: stocks,
            sorters: [{
                property: 'name'
            }],
            listeners: {
                update: this.onRecordUpdated
            }
        })
    }

    actionsRenderer = (value, record) => {
        return (
            <Button text="Buy" ui="round" className="x-item-no-select" handler={this.buy.bind(this, record)}/>
        )
    }

    buy = (record) => {
        Ext.toast(`Buy ${record.get('symbol')}`);
    }

    onRecordUpdated = (store, record, operation, modifiedFieldNames) => {
        const field = modifiedFieldNames[0];
        Ext.toast(`${record.get('name')} ${field} updated to ${record.get(field)}`)
    }

    renderTicks = (ticks) => {
        return (
            <SparkLineLine 
                values={ticks} 
                height={16} 
                tipTpl='Price: {y:number("0.00")}'
            />
        )
    }

    export = (type) => {
        this.grid.saveDocumentAs({
            type,
            title: 'Stocks'
        });
    }

    render() {
        return (
            <Grid 
                ref={grid => this.grid = grid} 
                store={this.store} 
                plugins={{
                    gridcellediting: true,
                    gridexporter: true
                }}
            >
                <TitleBar docked="top" title="Stocks">
                    <Button align="right" text="Export">
                        <Menu indented={false}>
                            <MenuItem text="Excel" handler={this.export.bind(this, 'excel07')}/>
                            <MenuItem text="CSV" handler={this.export.bind(this, 'csv')}/>
                        </Menu>
                    </Button>
                </TitleBar>
                <Column renderer={this.actionsRenderer} ignoreExport/>
                <Column dataIndex="name" text="Name" width={300} editable/>
                <Column dataIndex="symbol" text="Symbol" renderer={value => <b>{value}</b>} editable/>
                <Column dataIndex="ticks" text="Trend" sortable={false} ignoreExport>
                    <RendererCell forceWidth renderer={this.renderTicks} bodyStyle={{padding: 0}}/>
                </Column>
                <Column dataIndex="sector" text="Sector" width={200} editable>
                    <SelectField options={sectors}/>
                </Column>
                <Column dataIndex="industry" text="Industry" width={350} editable/>
            </Grid>
        );
    }

}