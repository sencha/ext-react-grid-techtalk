import React, { Component } from 'react';
import stocks from './data/stocks';
import { Grid, Column, Button, RendererCell, Container, SparkLineLine } from '@extjs/ext-react';

Ext.require('Ext.Toast');

export default class StocksGrid extends Component {
    
    store = new Ext.data.Store({
        data: stocks,
        sorters: [{
            property: 'name'
        }]
    })

    actionsRenderer = (value, record) => {
        return (
            <Button text="Buy" ui="round" className="x-item-no-select" handler={this.buy.bind(this, record)}/>
        )
    }

    buy = (record) => {
        Ext.toast(`Buy ${record.get('symbol')}`);
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

    render() {
        return (
            <Grid store={this.store}>
                <Column renderer={this.actionsRenderer}/>
                <Column dataIndex="name" text="Name" width={300}/>
                <Column dataIndex="symbol" text="Symbol" renderer={value => <b>{value}</b>}/>
                <Column dataIndex="ticks" text="Trend" sortable={false}>
                    <RendererCell forceWidth renderer={this.renderTicks} bodyStyle={{padding: 0}}/>
                </Column>
                <Column dataIndex="sector" text="Sector" width={200}/>
                <Column dataIndex="industry" text="Industry" width={350}/>
            </Grid>
        );
    }

}