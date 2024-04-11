import { DummyIdEvent } from "../generated/DummyContract/DummyContract";
import { DummyContract } from "../generated/DummyContract/DummyContract";
import { DummyIdEvent as DummyIdEventEntity, DummyData } from "../generated/schema";
import { ethereum, log } from "@graphprotocol/graph-ts";

export function handleDummyIdEvent(event: DummyIdEvent): void {
  let entity = new DummyIdEventEntity(event.transaction.hash.toHex());
  entity.eventId = event.params.id;
  entity.transactionHash = event.transaction.hash.toHex();

  // Perform eth_call to getDummyData function
  let contract = DummyContract.bind(event.address);
  let callResult = contract.try_getDummyData(event.params.id);

  if (!callResult.reverted) {
    let dummyData = new DummyData(event.transaction.hash.toHex());
    dummyData.addr1 = callResult.value.addr1.toHex();
    dummyData.addr2 = callResult.value.addr2.toHex();
    dummyData.value1 = callResult.value.value1;
    dummyData.value2 = callResult.value.value2;
    dummyData.save();

    entity.dummyData = dummyData.id;
  } else {
    // Handle the revert scenario
    // You can log an error or perform any other desired action
    // For this example, we'll just skip saving the dummyData
    log.warning("getDummyData call reverted for eventId: {}", [event.params.id.toString()]);
  }

  entity.save();
}