export function useTableSlot() {
    const getHeadSlotName = (value) => `head(${value || ''})`
    const getSlotCellName = (value) => `cell(${value || ''})`
    const getFootSlotName = (value) => `foot(${value || ''})`

    return {
        getHeadSlotName,
        getSlotCellName,
        getFootSlotName
    }
}