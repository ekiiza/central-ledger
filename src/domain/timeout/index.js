/*****
 License
 --------------
 Copyright © 2017 Bill & Melinda Gates Foundation
 The Mojaloop files are made available by the Bill & Melinda Gates Foundation under the Apache License, Version 2.0 (the "License") and you may not use these files except in compliance with the License. You may obtain a copy of the License at
 http://www.apache.org/licenses/LICENSE-2.0
 Unless required by applicable law or agreed to in writing, the Mojaloop files are distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 Contributors
 --------------
 This is the official list of the Mojaloop project contributors for this file.
 Names of the original copyright holders (individuals or organizations)
 should be listed with a '*' in the first column. People who have
 contributed from an organization can be listed under the organization
 that actually holds the copyright for their contributions (see the
 Gates Foundation organization for an example). Those individuals should have
 their names indented and be marked with a '-'. Email address can be added
 optionally within square brackets <email>.
 * Gates Foundation
 - Name Surname <name.surname@gatesfoundation.com>

 * Georgi Georgiev <georgi.georgiev@modusbox.com>
 --------------
 ******/

'use strict'

/**
 * @module src/domain/timeout/
 */

const SegmentModel = require('../../models/misc/segment')
const TransferTimeoutModel = require('../../models/transfer/transferTimeout')
const TransferStateChangeModel = require('../../models/transfer/transferStateChange')
const TransferFacade = require('../../models/transfer/facade')

const getTimeoutSegment = async () => {
  const params = {
    segmentType: 'timeout',
    enumeration: 0,
    tableName: 'transferStateChange'
  }
  let result = await SegmentModel.getByParams(params)
  return result
}

const cleanupTransferTimeout = async () => {
  let result = await TransferTimeoutModel.cleanup()
  return result
}

const getLatestTransferStateChange = async () => {
  let result = await TransferStateChangeModel.getLatest()
  return result
}

const timeoutExpireReserved = async (segmentId, intervalMin, intervalMax) => {
  let result = await TransferFacade.timeoutExpireReserved(segmentId, intervalMin, intervalMax)
  return result
}

module.exports = {
  getTimeoutSegment,
  cleanupTransferTimeout,
  getLatestTransferStateChange,
  timeoutExpireReserved
}
