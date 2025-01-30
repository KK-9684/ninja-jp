const SpotSelector = () => {
    return (
        <select className="md:hidden p-4 bg-ninjack-bg-gray rounded-md border-ninjack-line-gray border-[1px] text-[14px] text-ninjack-white custom-select">
            <option value="すべて">すべて</option>
            <option value="史跡">史跡</option>
            <option value="テーマパーク">テーマパーク</option>
            <option value="道場">道場</option>
            <option value="販売店">販売店</option>
            <option value="飲食店">飲食店</option>
            <option value="その他">その他</option>
        </select>
    );
}

export default SpotSelector;