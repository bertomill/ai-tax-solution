// Simple script to add Tax Compliance Simulation data point
const { addTaxComplianceSimulationOpportunity } = require('./src/lib/automation-data.ts')

async function addDataPoint() {
  try {
    console.log('Adding Tax Compliance Simulation opportunity...')
    const result = await addTaxComplianceSimulationOpportunity()
    
    if (result) {
      console.log('✅ Successfully added Tax Compliance Simulation:', result)
    } else {
      console.log('❌ Failed to add Tax Compliance Simulation')
    }
  } catch (error) {
    console.error('Error:', error)
  }
}

addDataPoint() 