type SelectType = {
  quantity: number
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  className?: string
}

const Select = ({ quantity, handleChange, className }: SelectType) => {
  return (
    <div className={`text-sm md:text-lg ${className}`}>
      <label className='mr-4'>Quantity</label>
      <select
        value={quantity}
        onChange={e => handleChange(e)}
        className='cursor-pointer rounded-lg border-none bg-blue-500 p-1 text-white'>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
      </select>
    </div>
  )
}
export default Select
