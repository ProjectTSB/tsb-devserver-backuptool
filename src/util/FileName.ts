export const FileName = (): string => {
    const now = new Date();

    const year = `0000${now.getFullYear()}`.slice(-4);
    const month = `00${now.getMonth() + 1}`.slice(-2);
    const date = `00${now.getDate()}`.slice(-2);
    const hours = `00${now.getHours()}`.slice(-2);
    const minutes = `00${now.getMinutes()}`.slice(-2);
    const seconds = `00${now.getSeconds()}`.slice(-2);

    return `backup_${year}-${month}-${date}_${hours}-${minutes}-${seconds}.tar.gz`;
};
